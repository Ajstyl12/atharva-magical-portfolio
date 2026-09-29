import React, { useState, useRef } from 'react';
import { useWizardTheme } from '../context/ThemeContext';
import { soundFx } from '../utils/audioEffects';
import confetti from 'canvas-confetti';
import { Camera, Plus, Sparkles, Image as ImageIcon, X, Trash2, Maximize2, RotateCcw, Upload, CheckCircle2 } from 'lucide-react';
import { RubberStamp } from './StampBadge';
import { MinistrySecurityModal } from './MinistrySecurityModal';

export const EnchantedGallery: React.FC = () => {
  const { themeMode, getHouseColor, photos, addPhoto, removePhoto, resetPhotos, isPhotoUploaderOpen, setIsPhotoUploaderOpen } = useWizardTheme();
  const isLumos = themeMode === 'lumos';
  const houseStyles = getHouseColor();

  // State for Photo Upload Modal
  const [newTitle, setNewTitle] = useState('');
  const [newCaption, setNewCaption] = useState('');
  const [newDate, setNewDate] = useState('');
  const [newLocation, setNewLocation] = useState('');
  const [newCategory, setNewCategory] = useState('PORTRAIT // MEMORY');
  const [previewUrl, setPreviewUrl] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  // Security Lock State
  const [secModal, setSecModal] = useState<{ isOpen: boolean; actionTitle: string; action: () => void }>({
    isOpen: false,
    actionTitle: '',
    action: () => {}
  });

  const requestPasscode = (actionTitle: string, action: () => void) => {
    setSecModal({ isOpen: true, actionTitle, action });
  };

  // State for Fullscreen Lightbox
  const [activePhoto, setActivePhoto] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      soundFx.playWandCast();
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        setPreviewUrl(result);
        if (!newTitle) {
          const name = file.name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " ");
          setNewTitle(name.charAt(0).toUpperCase() + name.slice(1));
        }
        if (!newDate) {
          setNewDate('August 2026');
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!previewUrl) {
      alert('Please select or upload an image file first.');
      return;
    }

    requestPasscode(`Upload Custom Portrait Photo: ${newTitle || 'New Portrait'}`, () => {
      soundFx.playStamp();
      setIsUploading(true);

      addPhoto({
        title: newTitle || 'Enchanted Memory Portrait',
        caption: newCaption || 'Captured with magical focus. Hover cursor to illuminate in full color.',
        date: newDate || 'August 2026',
        location: newLocation || 'Hogwarts Sanctum',
        categoryTag: newCategory,
        imageUrl: previewUrl
      });

      try {
        confetti({
          particleCount: 60,
          spread: 70,
          origin: { y: 0.65 },
          colors: [houseStyles.primary, houseStyles.secondary, '#D4AF37', '#10B981']
        });
      } catch {
        // safe fallback
      }

      setTimeout(() => {
        setIsUploading(false);
        setIsPhotoUploaderOpen(false);
        setNewTitle('');
        setNewCaption('');
        setNewDate('');
        setNewLocation('');
        setPreviewUrl('');
      }, 600);
    });
  };

  return (
    <section id="gallery" className={`py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b transition-colors duration-500 ${
      isLumos ? 'border-[#CBD5E1] bg-[#FFFFFF]' : 'border-[#1E1E24] bg-[#000000]'
    }`}>
      {/* Chapter Editorial Header */}
      <div className={`flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 pb-4 border-b ${
        isLumos ? 'border-[#8B0000]' : 'border-[#1E1E24]'
      }`}
      style={{ borderColor: houseStyles.border }}
      >
        <div>
          <div className="flex items-center gap-2 text-xs font-cinzel font-bold tracking-widest uppercase mb-1" style={{ color: isLumos ? houseStyles.primary : houseStyles.secondary }}>
            <Camera size={14} />
            <span>CHAPTER 04 // ENCHANTED MOVING PORTRAITS & MEMORIES GALLERY</span>
          </div>
          <h2 className={`font-cinzel-dec text-3xl sm:text-5xl font-black uppercase ${
            isLumos ? 'text-[#0F172A]' : 'text-[#F8FAFC]'
          }`}>
            ENCHANTED PORTRAITS
          </h2>
          <p className={`font-fell italic text-xs sm:text-sm mt-1 max-w-2xl font-medium ${
            isLumos ? 'text-[#334155]' : 'text-[#94A3B8]'
          }`}>
            Hover your wand or cursor over any photograph to cast <span className="font-bold underline" style={{ color: houseStyles.primary }}>Lumos</span> and reveal vibrant full color; move your cursor away to return the portrait to antique monochrome print.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              soundFx.playWandCast();
              setIsPhotoUploaderOpen(true);
            }}
            className="flex items-center gap-2 px-4 py-2 text-xs font-cinzel font-black uppercase rounded border transition-all cursor-pointer shadow-md hover:scale-105"
            style={{
              backgroundColor: houseStyles.primary,
              color: '#FFFFFF',
              borderColor: houseStyles.border
            }}
          >
            <Plus size={14} />
            <span>+ UPLOAD NEW PHOTO</span>
          </button>
          <RubberStamp label="MOVING PORTRAITS" subLabel="HOGWARTS DAILY" variant="wax-crimson" angle={-2} />
        </div>
      </div>

      {/* Grid of Interactive Enchanted Portraits */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {photos.map((photo) => (
          <div
            key={photo.id}
            className={`group relative rounded-sm p-4 sm:p-5 flex flex-col justify-between transition-all duration-300 ${
              isLumos
                ? 'glass-card-lumos hover:border-[#8B0000]'
                : 'glass-card-nox hover:border-[#D4AF37]'
            }`}
            style={{
              borderColor: isLumos ? undefined : `${houseStyles.border}50`
            }}
          >
            {/* Top Metadata Strip */}
            <div className={`flex items-center justify-between pb-2 mb-3 border-b text-[10px] font-mono-runes font-black ${
              isLumos ? 'border-slate-200/80 text-[#090D16]' : 'border-white/10 text-[#E2E8F0]'
            }`}>
              <span className="uppercase font-black" style={{ color: isLumos ? houseStyles.primary : houseStyles.secondary }}>
                {photo.categoryTag}
              </span>
              <span>{photo.date}</span>
            </div>

            {/* Photo Container with B&W to Color Magical Hover Effect */}
            <div
              onClick={() => setActivePhoto(photo.imageUrl)}
              className="relative aspect-[4/5] rounded overflow-hidden cursor-pointer bg-[#121217] border border-slate-300 dark:border-white/15 shadow-sm"
            >
              <img
                src={photo.imageUrl}
                alt={photo.title}
                className="w-full h-full object-cover object-top magical-portrait-bw"
                loading="lazy"
              />

              {/* Hover Lumos Glow Overlay Badge */}
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/85 backdrop-blur-md px-2 py-0.5 rounded text-[9px] font-cinzel font-bold text-[#FDE047] border border-[#D4AF37]/60 flex items-center gap-1 z-10">
                <Sparkles size={10} className="animate-spin" />
                <span>LUMOS ACTIVE</span>
              </div>

              {/* Zoom Trigger Button */}
              <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/85 text-white p-1.5 rounded-full border border-white/20 hover:scale-110 z-10">
                <Maximize2 size={12} />
              </div>

              {/* Monogram Overlay Badge */}
              <div className="absolute bottom-2 left-2 bg-black/75 px-2 py-0.5 rounded text-[8px] font-mono-runes text-[#E2E8F0] uppercase tracking-wider font-bold z-10">
                ATHARVA // 394
              </div>
            </div>

            {/* Title & Caption */}
            <div className="mt-3 space-y-1">
              <h3 className={`font-cinzel text-sm font-black group-hover:underline transition-colors ${
                isLumos ? 'text-[#090D16]' : 'text-[#F8FAFC]'
              }`}>
                {photo.title}
              </h3>
              <p className={`font-fell italic text-xs leading-relaxed line-clamp-2 font-semibold ${
                isLumos ? 'text-[#1E293B]' : 'text-[#CBD5E1]'
              }`}>
                {photo.caption}
              </p>
            </div>

            {/* Bottom Location & Delete Button (if custom) */}
            <div className={`mt-3 pt-2 border-t flex items-center justify-between text-[10px] font-mono-runes font-black ${
              isLumos ? 'border-slate-200/80 text-[#334155]' : 'border-white/10 text-[#CBD5E1]'
            }`}>
              <span className="truncate max-w-[170px]">{photo.location}</span>
              {photo.isCustom && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    requestPasscode(`Delete Portrait Photo: ${photo.title}`, () => removePhoto(photo.id));
                  }}
                  title="Remove photograph"
                  className="text-[#DC2626] hover:text-[#B91C1C] p-1 cursor-pointer"
                >
                  <Trash2 size={12} />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Photo Upload Banner Prompt */}
      <div className={`mt-10 p-6 rounded-sm border-2 border-dashed flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left transition-all ${
        isLumos
          ? 'glass-card-lumos border-slate-300 hover:border-[#8B0000]'
          : 'glass-card-nox border-white/20 hover:border-[#D4AF37]'
      }`}>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full flex items-center justify-center shrink-0 border"
            style={{
              backgroundColor: `${houseStyles.primary}15`,
              borderColor: houseStyles.border,
              color: houseStyles.primary
            }}
          >
            <ImageIcon size={22} />
          </div>
          <div>
            <h4 className={`font-cinzel font-black text-sm ${isLumos ? 'text-[#090D16]' : 'text-[#F8FAFC]'}`}>
              Have Personal Photographs or Project Artifacts to Showcase?
            </h4>
            <p className={`font-fell italic text-xs sm:text-sm font-semibold ${isLumos ? 'text-[#1E293B]' : 'text-[#CBD5E1]'}`}>
              Upload your own pictures directly to store them in your local enchanted grimoire with authentic B&W-to-color hover reactivity.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              soundFx.playWandCast();
              setIsPhotoUploaderOpen(true);
            }}
            className="px-4 py-2 font-cinzel text-xs font-black rounded uppercase border transition-all cursor-pointer shadow-sm hover:scale-105"
            style={{
              backgroundColor: houseStyles.primary,
              color: '#FFFFFF',
              borderColor: houseStyles.border
            }}
          >
            + UPLOAD PHOTO
          </button>
          <button
            onClick={resetPhotos}
            title="Reset gallery photos to default"
            className={`p-2 rounded cursor-pointer text-xs transition-all ${
              isLumos ? 'glass-sub-lumos text-[#090D16] hover:bg-white' : 'glass-sub-nox text-[#E2E8F0] hover:text-white hover:bg-white/20'
            }`}
          >
            <RotateCcw size={14} />
          </button>
        </div>
      </div>

      {/* ================= MODAL: PHOTO UPLOADER ================= */}
      {isPhotoUploaderOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-xl p-3 sm:p-6 overflow-y-auto">
          <div
            className={`relative w-full max-w-2xl rounded-sm shadow-2xl border-2 overflow-hidden my-auto flex flex-col transition-all duration-300 ${
              isLumos ? 'bg-[#FFFFFF] border-[#8B0000] text-[#0F172A]' : 'bg-[#08080C] border-[#D4AF37] text-[#F8FAFC]'
            }`}
            style={{ borderColor: houseStyles.border }}
          >
            {/* Modal Header */}
            <div className={`flex items-center justify-between px-6 py-3.5 border-b ${
              isLumos ? 'bg-[#F8FAFC] border-[#E2E8F0]' : 'bg-[#101017] border-[#1E1E24]'
            }`}>
              <div className="flex items-center gap-2">
                <Camera size={16} style={{ color: houseStyles.primary }} />
                <span className={`font-cinzel-dec font-black text-sm ${isLumos ? 'text-[#0F172A]' : 'text-[#FDE047]'}`}>
                  ENCHANTED PHOTO VAULT // UPLOAD PORTRAIT
                </span>
              </div>
              <button
                onClick={() => setIsPhotoUploaderOpen(false)}
                className={`p-1 rounded transition-colors cursor-pointer ${isLumos ? 'text-[#0F172A] hover:bg-[#E2E8F0]' : 'text-[#94A3B8] hover:text-white'}`}
              >
                <X size={16} />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleUploadSubmit} className="p-6 sm:p-8 space-y-4 font-sans-body">
              {/* File Dropzone */}
              <div
                onClick={() => fileInputRef.current?.click()}
                className={`p-6 rounded border-2 border-dashed flex flex-col items-center justify-center text-center cursor-pointer transition-all ${
                  isLumos
                    ? 'bg-[#F8FAFC] border-[#CBD5E1] hover:border-[#8B0000]'
                    : 'bg-[#0E0E14] border-[#1E1E24] hover:border-[#D4AF37]'
                }`}
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileSelect}
                  accept="image/*"
                  className="hidden"
                />
                {previewUrl ? (
                  <div className="space-y-2 flex flex-col items-center">
                    <img
                      src={previewUrl}
                      alt="Preview"
                      className="w-28 h-28 object-cover rounded border-2 shadow-md magical-portrait-bw"
                    />
                    <span className="font-cinzel text-xs font-bold text-[#059669] flex items-center gap-1">
                      <CheckCircle2 size={12} /> Image Ready • Click to change
                    </span>
                  </div>
                ) : (
                  <>
                    <div className="w-12 h-12 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/40 flex items-center justify-center mb-2" style={{ color: houseStyles.primary }}>
                      <Upload size={20} />
                    </div>
                    <span className="font-cinzel text-xs font-bold block">
                      Click to Select or Drop Photograph
                    </span>
                    <span className={`font-mono-runes text-[10px] mt-1 ${isLumos ? 'text-[#475569]' : 'text-[#888]'}`}>
                      PNG, JPG, WebP, GIF supported • Stored locally in your grimoire
                    </span>
                  </>
                )}
              </div>

              {/* Title Input */}
              <div className="space-y-1">
                <label className="font-cinzel text-[11px] font-bold uppercase tracking-wider block" style={{ color: isLumos ? houseStyles.primary : houseStyles.secondary }}>
                  PHOTO TITLE / PORTRAIT NAME *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Atharva Bagwe — Lead Engineering Scholar"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className={`w-full px-3.5 py-2 rounded text-xs outline-none border transition-colors ${
                    isLumos
                      ? 'bg-[#FFFFFF] border-[#CBD5E1] text-[#0F172A] focus:border-[#8B0000]'
                      : 'bg-[#050508] border-[#1E1E24] text-white focus:border-[#D4AF37]'
                  }`}
                />
              </div>

              {/* Caption */}
              <div className="space-y-1">
                <label className="font-cinzel text-[11px] font-bold uppercase tracking-wider block" style={{ color: isLumos ? houseStyles.primary : houseStyles.secondary }}>
                  CAPTION / MEMORY DESCRIPTION
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Captured during the final capstone presentation. Hover cursor to illuminate."
                  value={newCaption}
                  onChange={(e) => setNewCaption(e.target.value)}
                  className={`w-full px-3.5 py-2 rounded text-xs outline-none border transition-colors resize-none ${
                    isLumos
                      ? 'bg-[#FFFFFF] border-[#CBD5E1] text-[#0F172A] focus:border-[#8B0000]'
                      : 'bg-[#050508] border-[#1E1E24] text-white focus:border-[#D4AF37]'
                  }`}
                />
              </div>

              {/* Date & Location */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-cinzel text-[11px] font-bold uppercase tracking-wider block" style={{ color: isLumos ? houseStyles.primary : houseStyles.secondary }}>
                    DATE CAPTURED
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. August 2026"
                    value={newDate}
                    onChange={(e) => setNewDate(e.target.value)}
                    className={`w-full px-3.5 py-2 rounded text-xs outline-none border transition-colors ${
                      isLumos
                        ? 'bg-[#FFFFFF] border-[#CBD5E1] text-[#0F172A] focus:border-[#8B0000]'
                        : 'bg-[#050508] border-[#1E1E24] text-white focus:border-[#D4AF37]'
                    }`}
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-cinzel text-[11px] font-bold uppercase tracking-wider block" style={{ color: isLumos ? houseStyles.primary : houseStyles.secondary }}>
                    LOCATION / SANCTUM
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Hogwarts / Mumbai"
                    value={newLocation}
                    onChange={(e) => setNewLocation(e.target.value)}
                    className={`w-full px-3.5 py-2 rounded text-xs outline-none border transition-colors ${
                      isLumos
                        ? 'bg-[#FFFFFF] border-[#CBD5E1] text-[#0F172A] focus:border-[#8B0000]'
                        : 'bg-[#050508] border-[#1E1E24] text-white focus:border-[#D4AF37]'
                    }`}
                  />
                </div>
              </div>

              {/* Tag Dropdown */}
              <div className="space-y-1">
                <label className="font-cinzel text-[11px] font-bold uppercase tracking-wider block" style={{ color: isLumos ? houseStyles.primary : houseStyles.secondary }}>
                  CATEGORY TAG
                </label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className={`w-full px-3.5 py-2 rounded text-xs font-cinzel outline-none border transition-colors cursor-pointer ${
                    isLumos
                      ? 'bg-[#FFFFFF] border-[#CBD5E1] text-[#0F172A] focus:border-[#8B0000]'
                      : 'bg-[#050508] border-[#1E1E24] text-white focus:border-[#D4AF37]'
                  }`}
                >
                  <option value="PORTRAIT // MONOGRAM">PORTRAIT // MONOGRAM</option>
                  <option value="BROADCAST // OPERATIONS">BROADCAST // OPERATIONS</option>
                  <option value="RESEARCH // IRJMETS">RESEARCH // IRJMETS</option>
                  <option value="HACKATHON // LEADERSHIP">HACKATHON // LEADERSHIP</option>
                  <option value="PERSONAL // PASSION">PERSONAL // PASSION</option>
                </select>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isUploading}
                  className="w-full py-3 font-cinzel text-xs font-black uppercase rounded border shadow-lg transition-all cursor-pointer hover:scale-[1.02]"
                  style={{
                    backgroundColor: houseStyles.primary,
                    color: '#FFFFFF',
                    borderColor: houseStyles.border
                  }}
                >
                  {isUploading ? 'ENCHANTING & STAMPING PORTRAIT...' : 'ENCHANT & ADD TO MOVING PORTRAIT GALLERY'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= MODAL: FULLSCREEN LIGHTBOX ================= */}
      {activePhoto && (
        <div
          onClick={() => setActivePhoto(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-2xl p-4 cursor-pointer"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl max-h-[90vh] flex flex-col items-center"
          >
            <button
              onClick={() => setActivePhoto(null)}
              className="absolute -top-10 right-0 text-white hover:text-[#D4AF37] p-1.5 transition-colors cursor-pointer"
            >
              <X size={24} />
            </button>
            <img
              src={activePhoto}
              alt="Enchanted View"
              className="max-h-[80vh] w-auto object-contain rounded border-2 shadow-[0_0_50px_rgba(212,175,55,0.4)]"
              style={{ borderColor: houseStyles.border }}
            />
            <span className="font-cinzel text-xs text-[#D4AF37] mt-3 font-bold">
              ✨ CASTING FULL-SPECTRUM LUMOS • CLICK OUTSIDE TO CLOSE
            </span>
          </div>
        </div>
      )}

      {/* Universal Ministry Security Passcode Lock Modal */}
      <MinistrySecurityModal
        isOpen={secModal.isOpen}
        actionTitle={secModal.actionTitle}
        onClose={() => setSecModal({ ...secModal, isOpen: false })}
        onSuccess={secModal.action}
      />
    </section>
  );
};
