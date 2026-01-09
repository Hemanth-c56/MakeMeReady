'use client';

import { useEffect, useRef, useState } from 'react';

import { X } from 'lucide-react';

import { Badge } from '~/shared/shadcn/badge';
import { Button } from '~/shared/shadcn/button';
import { Input } from '~/shared/shadcn/input';

import type React from 'react';

interface SmartTagInputProps {
  suggestions: string[];
  onTagsChange: (tags: string[]) => void;
  placeholder?: string;
  helperText?: string;
}

export function SmartTagInput({
  suggestions,
  onTagsChange,
  placeholder = 'Type to search or add custom tags...',
  helperText = 'Leave empty to start a General Interview covering all topics.'
}: SmartTagInputProps) {
  const [tags, setTags] = useState<string[]>([]);
  const [input, setInput] = useState('');
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (input.trim()) {
      const filtered = suggestions.filter(
        (suggestion) =>
          suggestion.toLowerCase().includes(input.toLowerCase()) && !tags.includes(suggestion)
      );
      setFilteredSuggestions(filtered);
      setShowDropdown(true);
    } else {
      setFilteredSuggestions([]);
      setShowDropdown(false);
    }
  }, [input, suggestions, tags]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const addTag = (tag: string) => {
    const trimmedTag = tag.trim();
    if (trimmedTag && !tags.includes(trimmedTag)) {
      const newTags = [...tags, trimmedTag];
      setTags(newTags);
      onTagsChange(newTags);
      setInput('');
      setShowDropdown(false);
    }
  };

  const removeTag = (tag: string) => {
    const newTags = tags.filter((t) => t !== tag);
    setTags(newTags);
    onTagsChange(newTags);
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag(input);
    }
  };

  return (
    <div className="space-y-3">
      <div className="relative">
        <Input
          ref={inputRef}
          type="text"
          placeholder={placeholder}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleInputKeyDown}
          onFocus={() => input.trim() && setShowDropdown(true)}
          className="h-10"
        />

        {showDropdown && filteredSuggestions.length > 0 && (
          <div
            ref={dropdownRef}
            className="bg-card border-border absolute top-full right-0 left-0 z-50 mt-2 rounded-lg border shadow-lg">
            <div className="max-h-48 space-y-1 overflow-y-auto p-2">
              <p className="text-muted-foreground px-2 py-1 text-xs font-semibold uppercase">
                Suggested Topics
              </p>
              {filteredSuggestions.map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => addTag(suggestion)}
                  className="hover:bg-primary/10 text-foreground w-full rounded px-3 py-2 text-left text-sm transition-colors">
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        )}

        {input.trim() && filteredSuggestions.length === 0 && showDropdown && (
          <div
            ref={dropdownRef}
            className="bg-card border-border absolute top-full right-0 left-0 z-50 mt-2 rounded-lg border p-3 shadow-lg">
            <p className="text-muted-foreground mb-3 text-sm">
              No suggestions found. Press Enter to add "{input.trim()}" as a custom topic.
            </p>
            <Button
              size="sm"
              variant="outline"
              className="w-full bg-transparent"
              onClick={() => addTag(input)}>
              Add Custom Topic
            </Button>
          </div>
        )}
      </div>

      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2 pt-2">
          {tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="flex items-center gap-1 py-1 pr-1 pl-3">
              {tag}
              <button
                onClick={() => removeTag(tag)}
                className="hover:text-foreground ml-1 transition-colors">
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>
      )}

      <p className="text-muted-foreground text-xs italic">{helperText}</p>
    </div>
  );
}
