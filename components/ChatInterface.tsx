
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Message, MessageRole, Paper, Source } from '../types';
import { getChatResponseStream, findRelatedPapers } from '../services/geminiService';

const UserIcon: React.FC = () => (
  <div className="w-8 h-8 rounded-full bg-primary-700 flex items-center justify-center font-bold text-white text-sm flex-shrink-0">
    You
  </div>
);

const ModelIcon: React.FC = () => (
  <div className="w-8 h-8 rounded-full bg-slate-600 flex items-center justify-center flex-shrink-0">
      <svg className="w-5 h-5 text-primary-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
      </svg>
  </div>
);

const PaperCard: React.FC<{ paper: Paper }> = ({ paper }) => {
    const { t } = useLanguage();
    return (
        <div className="bg-slate-700/50 p-4 rounded-lg border border-slate-600/50 hover:border-primary-500/50 transition-all duration-200">
            <h4 className="font-bold text-primary-300">{paper.title}</h4>
            <p className="text-sm text-slate-400 mt-1">{paper.authors} ({paper.year})</p>
            <p className="text-sm text-slate-300 mt-2">{paper.summary}</p>
            <a href={paper.url} target="_blank" rel="noopener noreferrer" className="text-sm text-primary-400 hover:underline mt-2 inline-block">
                {t('viewSource')} &rarr;
            </a>
        </div>
    );
};

const Sources: React.FC<{ sources: Source[] }> = ({ sources }) => {
  const { t } = useLanguage();
  if (!sources || sources.length === 0) return null;
  return (
    <div className="mt-4 border-t border-slate-600 pt-3">
      <h4 className="text-sm font-semibold text-slate-300 mb-2">{t('sources')}</h4>
      <div className="flex flex-wrap gap-2">
        {sources.map((source, index) => (
          <a
            key={index}
            href={source.uri}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs bg-slate-700 hover:bg-slate-600 text-slate-300 px-2 py-1 rounded-md transition-colors"
          >
            {index + 1}. {new URL(source.uri).hostname}
          </a>
        ))}
      </div>
    </div>
  );
};


const ChatInterface: React.FC = () => {
  const { t, language } = useLanguage();
  const [messages, setMessages] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);


  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [userInput]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
      setMessages([]); // Reset chat when a new file is uploaded
    }
  };

  const handleSendMessage = useCallback(async (messageText: string) => {
    const trimmedMessage = messageText.trim();
    if (!trimmedMessage || isLoading) return;

    setUserInput('');
    setIsLoading(true);

    const newMessages: Message[] = [...messages, { role: MessageRole.USER, text: trimmedMessage }];
    setMessages(newMessages);

    // Add a placeholder for the model's response
    setMessages(prev => [...prev, { role: MessageRole.MODEL, text: '' }]);

    try {
      if (trimmedMessage.toLowerCase().includes('related papers')) {
          const topic = file ? `the topic of the uploaded document "${file.name}"` : 'the current conversation topic';
          const { papers, sources } = await findRelatedPapers(topic);
          setMessages(prev => {
              const lastMessage = prev[prev.length - 1];
              lastMessage.text = papers.length > 0 ? t('relatedPapers') : "I couldn't find any related papers at the moment.";
              lastMessage.relatedPapers = papers;
              lastMessage.sources = sources;
              return [...prev];
          });
      } else {
          const history = messages.map(msg => ({
              role: msg.role,
              parts: [{ text: msg.text }]
          }));
          
          const stream = await getChatResponseStream(history, trimmedMessage, file ?? undefined);
          
          let responseText = '';
          for await (const chunk of stream) {
              responseText += chunk.text;
              setMessages(prev => {
                  const lastMessage = prev[prev.length - 1];
                  lastMessage.text = responseText;
                  return [...prev];
              });
          }
      }
    } catch (error) {
      console.error(error);
      setMessages(prev => {
          const lastMessage = prev[prev.length - 1];
          lastMessage.text = "Sorry, I encountered an error. Please try again.";
          return [...prev];
      });
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, messages, file, t]);

  const SuggestionButton: React.FC<{ textKey: string }> = ({ textKey }) => (
    <button
      onClick={() => handleSendMessage(t(textKey))}
      className="bg-slate-700/80 text-sm text-slate-300 px-4 py-2 rounded-lg hover:bg-slate-700 transition-colors text-start"
    >
      {t(textKey)}
    </button>
  );

  return (
    <div className="flex-1 flex flex-col bg-slate-800 w-full max-w-4xl mx-auto rounded-t-lg border border-slate-700 shadow-2xl overflow-hidden">
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {messages.length === 0 && !file && (
          <div className="text-center text-slate-400 h-full flex flex-col justify-center items-center">
             <svg className="w-16 h-16 text-slate-600 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m.75 12l3 3m0 0l3-3m-3 3v-6m-1.5-9H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
            </svg>
            <h2 className="text-lg font-medium text-slate-300">{t('uploadCTA')}</h2>
            <p className="mt-1">{t('or')} {t('dropFile')}</p>
            <button
                onClick={() => fileInputRef.current?.click()}
                className="mt-4 px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
              >
                Browse Files
            </button>
             <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept=".pdf,.txt,.md,image/*" />
          </div>
        )}
        
        {messages.map((message, index) => (
          <div key={index} className={`flex items-start gap-3 ${message.role === MessageRole.USER ? (language === 'ar' ? 'flex-row-reverse' : 'flex-row') : (language === 'ar' ? 'flex-row-reverse' : 'flex-row')}`}>
            {message.role === MessageRole.USER ? <UserIcon /> : <ModelIcon />}
            <div className={`flex-1 p-4 rounded-lg ${message.role === MessageRole.USER ? 'bg-primary-800/50 text-white' : 'bg-slate-700/70 text-slate-300'}`}>
              <div className="whitespace-pre-wrap leading-relaxed">{message.text}</div>
              {message.relatedPapers && message.relatedPapers.length > 0 && (
                <div className="mt-4 border-t border-slate-600 pt-4">
                  <h3 className="font-bold text-lg text-slate-200 mb-3">{t('relatedPapers')}</h3>
                  <div className="grid grid-cols-1 gap-4">
                    {message.relatedPapers.map((paper, i) => (
                      <PaperCard key={i} paper={paper} />
                    ))}
                  </div>
                </div>
              )}
               <Sources sources={message.sources || []} />
            </div>
          </div>
        ))}
        {isLoading && messages[messages.length - 1].role === MessageRole.MODEL && (
            <div className="flex items-start gap-3">
                <ModelIcon />
                <div className="flex-1 p-4 rounded-lg bg-slate-700/70 text-slate-300 flex items-center">
                   <div className="w-2 h-2 bg-primary-400 rounded-full animate-pulse mr-2"></div>
                   <div className="w-2 h-2 bg-primary-400 rounded-full animate-pulse delay-75 mr-2"></div>
                   <div className="w-2 h-2 bg-primary-400 rounded-full animate-pulse delay-150 mr-2"></div>
                </div>
            </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {file && messages.length === 0 && (
          <div className="p-6 text-center">
            <h3 className="text-xl font-semibold text-slate-200">{t('heroTitle')}</h3>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-3">
                <SuggestionButton textKey="suggestion1" />
                <SuggestionButton textKey="suggestion2" />
                <SuggestionButton textKey="suggestion3" />
            </div>
          </div>
      )}

      <div className="p-4 bg-slate-900/50 border-t border-slate-700">
        {file && (
          <div className="mb-2 flex items-center text-sm text-slate-400">
            <span className="font-medium text-slate-300 me-2">{t('fileUploaded')}</span>
            <span className="bg-slate-700 px-2 py-1 rounded">{file.name}</span>
            <button onClick={() => setFile(null)} className="ms-2 text-primary-400 hover:underline">{t('changeFile')}</button>
          </div>
        )}
        <div className="relative">
          <textarea
            ref={textareaRef}
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage(userInput);
              }
            }}
            placeholder={file ? t('askAnything') : t('placeholder')}
            className="w-full bg-slate-700 text-slate-200 rounded-lg p-3 pr-12 border-2 border-transparent focus:border-primary-500 focus:ring-0 resize-none transition-colors"
            rows={1}
            disabled={!file && messages.length === 0}
          />
          <button
            onClick={() => handleSendMessage(userInput)}
            disabled={isLoading || !userInput.trim()}
            className="absolute end-2.5 bottom-2.5 bg-primary-600 rounded-md p-2 text-white hover:bg-primary-700 disabled:bg-slate-600 disabled:cursor-not-allowed transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.428A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
