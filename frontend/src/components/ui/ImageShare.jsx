import React, { useState, useCallback } from 'react';
import { Share2, Copy, Facebook, Twitter, Instagram, ExternalLink, Check } from 'lucide-react';
import { Button } from './button';

const ImageShare = ({ 
  imageUrl, 
  imageTitle = 'Paradise Resort Vattavada', 
  imageDescription = 'Beautiful accommodation at Paradise Resort',
  className = '',
  size = 'sm',
  variant = 'ghost'
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [shareError, setShareError] = useState(null);

  // Get absolute URL for sharing
  const getAbsoluteImageUrl = useCallback(() => {
    if (imageUrl.startsWith('http')) {
      return imageUrl;
    }
    return `${window.location.origin}${imageUrl.startsWith('/') ? imageUrl : '/' + imageUrl}`;
  }, [imageUrl]);

  // Native Web Share API (mobile-first)
  const handleNativeShare = useCallback(async () => {
    if (!navigator.share) return false;

    try {
      await navigator.share({
        title: imageTitle,
        text: imageDescription,
        url: getAbsoluteImageUrl()
      });
      return true;
    } catch (error) {
      if (error.name !== 'AbortError') {
        setShareError('Sharing failed. Please try copying the link instead.');
      }
      return false;
    }
  }, [imageTitle, imageDescription, getAbsoluteImageUrl]);

  // Copy to clipboard
  const handleCopyLink = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(getAbsoluteImageUrl());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      setShareError('Failed to copy link. Please try selecting and copying manually.');
    }
  }, [getAbsoluteImageUrl]);

  // Social media sharing URLs
  const getSocialShareUrl = useCallback((platform) => {
    const absoluteUrl = getAbsoluteImageUrl();
    const encodedUrl = encodeURIComponent(absoluteUrl);
    const encodedTitle = encodeURIComponent(imageTitle);
    const encodedDescription = encodeURIComponent(imageDescription);

    const urls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      whatsapp: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
      telegram: `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`
    };

    return urls[platform];
  }, [getAbsoluteImageUrl, imageTitle, imageDescription]);

  // Handle share button click
  const handleShare = useCallback(async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    setShareError(null);
    
    // Try native share first (mobile)
    const nativeShareSuccess = await handleNativeShare();
    if (nativeShareSuccess) return;
    
    // Fallback to share menu
    setIsOpen(!isOpen);
  }, [handleNativeShare, isOpen]);

  // Handle social share
  const handleSocialShare = useCallback((platform) => {
    const shareUrl = getSocialShareUrl(platform);
    window.open(shareUrl, '_blank', 'width=600,height=400,scrollbars=yes,resizable=yes');
    setIsOpen(false);
  }, [getSocialShareUrl]);

  return (
    <div className={`relative ${className}`}>
      {/* Share Button */}
      <Button
        variant={variant}
        size={size}
        onClick={handleShare}
        className="p-2 hover:bg-black/10 transition-colors"
        aria-label="Share image"
      >
        <Share2 className="w-4 h-4" />
      </Button>

      {/* Share Menu */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Share Options */}
          <div className="absolute right-0 top-full mt-2 bg-white rounded-lg shadow-lg border border-gray-200 p-3 z-50 min-w-[200px]">
            <div className="space-y-2">
              {/* Copy Link */}
              <button
                onClick={handleCopyLink}
                className="flex items-center gap-3 w-full p-2 text-left hover:bg-gray-50 rounded-md transition-colors"
              >
                {copied ? (
                  <Check className="w-4 h-4 text-green-600" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
                <span className="text-sm">
                  {copied ? 'Copied!' : 'Copy Link'}
                </span>
              </button>

              {/* Social Media Options */}
              <div className="border-t pt-2">
                <p className="text-xs text-[hsl(var(--muted-foreground))] mb-2">Share on social media</p>
                
                <button
                  onClick={() => handleSocialShare('facebook')}
                  className="flex items-center gap-3 w-full p-2 text-left hover:bg-gray-50 rounded-md transition-colors"
                >
                  <Facebook className="w-4 h-4 text-blue-600" />
                  <span className="text-sm">Facebook</span>
                </button>
                
                <button
                  onClick={() => handleSocialShare('twitter')}
                  className="flex items-center gap-3 w-full p-2 text-left hover:bg-gray-50 rounded-md transition-colors"
                >
                  <Twitter className="w-4 h-4 text-blue-400" />
                  <span className="text-sm">Twitter</span>
                </button>
                
                <button
                  onClick={() => handleSocialShare('whatsapp')}
                  className="flex items-center gap-3 w-full p-2 text-left hover:bg-gray-50 rounded-md transition-colors"
                >
                  <ExternalLink className="w-4 h-4 text-green-600" />
                  <span className="text-sm">WhatsApp</span>
                </button>
                
                <button
                  onClick={() => handleSocialShare('telegram')}
                  className="flex items-center gap-3 w-full p-2 text-left hover:bg-gray-50 rounded-md transition-colors"
                >
                  <ExternalLink className="w-4 h-4 text-blue-500" />
                  <span className="text-sm">Telegram</span>
                </button>
              </div>
            </div>
            
            {/* Error Message */}
            {shareError && (
              <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded text-xs text-red-600">
                {shareError}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default ImageShare;