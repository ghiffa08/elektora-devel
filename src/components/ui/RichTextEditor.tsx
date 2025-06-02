"use client";

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  FaBold, 
  FaItalic, 
  FaUnderline, 
  FaStrikethrough,
  FaListUl, 
  FaListOl, 
  FaQuoteLeft, 
  FaCode,
  FaLink,
  FaImage,  FaEye,
  FaEdit
} from 'react-icons/fa';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  minHeight?: number;
}

const RichTextEditor = ({ 
  value, 
  onChange, 
  placeholder = "Start writing...", 
  className = "",
  minHeight = 400 
}: RichTextEditorProps) => {
  const [isPreview, setIsPreview] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const insertText = (before: string, after: string = '', placeholder: string = '') => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end);
    
    let newText;
    if (selectedText) {
      newText = value.substring(0, start) + before + selectedText + after + value.substring(end);
    } else {
      newText = value.substring(0, start) + before + placeholder + after + value.substring(end);
    }
    
    onChange(newText);
    
    // Set cursor position
    setTimeout(() => {
      const newPosition = start + before.length + (selectedText || placeholder).length;
      textarea.setSelectionRange(newPosition, newPosition);
      textarea.focus();
    }, 0);
  };

  const insertAtCursor = (text: string) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const newText = value.substring(0, start) + text + value.substring(start);
    onChange(newText);
    
    setTimeout(() => {
      const newPosition = start + text.length;
      textarea.setSelectionRange(newPosition, newPosition);
      textarea.focus();
    }, 0);
  };

  const toolbarButtons = [
    {
      icon: FaBold,
      label: 'Bold',
      action: () => insertText('**', '**', 'bold text'),
    },
    {
      icon: FaItalic,
      label: 'Italic',
      action: () => insertText('*', '*', 'italic text'),
    },
    {
      icon: FaUnderline,
      label: 'Underline',
      action: () => insertText('<u>', '</u>', 'underlined text'),
    },
    {
      icon: FaStrikethrough,
      label: 'Strikethrough',
      action: () => insertText('~~', '~~', 'strikethrough text'),
    },
    { divider: true },
    {
      icon: FaListUl,
      label: 'Unordered List',
      action: () => insertAtCursor('\n- List item'),
    },
    {
      icon: FaListOl,
      label: 'Ordered List',
      action: () => insertAtCursor('\n1. List item'),
    },
    {
      icon: FaQuoteLeft,
      label: 'Quote',
      action: () => insertAtCursor('\n> Quote text'),
    },
    {
      icon: FaCode,
      label: 'Code',
      action: () => insertText('`', '`', 'code'),
    },
    { divider: true },
    {
      icon: FaLink,
      label: 'Link',
      action: () => insertText('[', '](url)', 'link text'),
    },
    {
      icon: FaImage,
      label: 'Image',
      action: () => insertText('![', '](image-url)', 'alt text'),
    },
  ];

  const renderPreview = () => {
    // Simple markdown preview (you can enhance this with a proper markdown parser)
    let html = value
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/~~(.*?)~~/g, '<del>$1</del>')
      .replace(/`(.*?)`/g, '<code class="bg-gray-200 dark:bg-gray-700 px-1 rounded">$1</code>')
      .replace(/^# (.*$)/gm, '<h1 class="text-3xl font-bold mb-4">$1</h1>')
      .replace(/^## (.*$)/gm, '<h2 class="text-2xl font-bold mb-3">$1</h2>')
      .replace(/^### (.*$)/gm, '<h3 class="text-xl font-bold mb-2">$1</h3>')
      .replace(/^> (.*$)/gm, '<blockquote class="border-l-4 border-blue-500 pl-4 italic text-gray-600 dark:text-gray-400">$1</blockquote>')
      .replace(/^\- (.*$)/gm, '<li>$1</li>')
      .replace(/^\d+\. (.*$)/gm, '<li>$1</li>')
      .replace(/\n/g, '<br>');

    // Wrap consecutive list items
    html = html.replace(/(<li>.*?<\/li>)(<br>)?/g, '$1');
    html = html.replace(/(<li>.*?<\/li>)+/g, '<ul class="list-disc list-inside mb-4">$&</ul>');

    return (
      <div 
        className="prose prose-lg max-w-none dark:prose-invert p-4"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    );
  };

  return (
    <div className={`border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 ${className}`}>
      {/* Toolbar */}
      <div className="flex items-center justify-between p-3 border-b border-gray-300 dark:border-gray-600">
        <div className="flex items-center gap-1">
          {toolbarButtons.map((button, index) => {
            if (button.divider) {
              return (
                <div 
                  key={index} 
                  className="w-px h-6 bg-gray-300 dark:bg-gray-600 mx-2" 
                />
              );            }
            
            const IconComponent = button.icon;
            if (!IconComponent) return null;
            
            return (
              <motion.button
                key={index}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={button.action}
                className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
                title={button.label}
                type="button"
              >
                <IconComponent className="w-4 h-4" />
              </motion.button>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsPreview(!isPreview)}
            className={`flex items-center gap-2 px-3 py-1 rounded text-sm font-medium transition-colors ${
              isPreview 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
            }`}
            type="button"
          >
            {isPreview ? <FaEdit /> : <FaEye />}
            {isPreview ? 'Edit' : 'Preview'}
          </motion.button>
        </div>
      </div>

      {/* Content Area */}
      <div style={{ minHeight }}>
        {isPreview ? (
          <div className="overflow-auto" style={{ minHeight }}>
            {value ? renderPreview() : (
              <div className="p-4 text-gray-500 italic">
                Nothing to preview yet...
              </div>
            )}
          </div>
        ) : (
          <textarea
            ref={textareaRef}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="w-full p-4 bg-transparent text-gray-900 dark:text-white placeholder-gray-500 resize-none focus:outline-none font-mono text-sm leading-relaxed"
            style={{ minHeight }}
          />
        )}
      </div>

      {/* Help Text */}
      <div className="px-4 py-2 bg-gray-50 dark:bg-gray-700 text-xs text-gray-500 dark:text-gray-400 border-t border-gray-300 dark:border-gray-600">
        <span className="font-medium">Tip:</span> You can use Markdown formatting. 
        <span className="ml-2">**bold**, *italic*, `code`, [link](url), ![image](url)</span>
      </div>
    </div>
  );
};

export default RichTextEditor;
