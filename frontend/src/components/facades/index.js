// Third-party resource facades for lazy loading and performance optimization
// These facades help reduce main-thread blocking time by deferring resource loading

export { default as YouTubeFacade } from './YouTubeFacade';
export { default as GoogleMapsFacade } from './GoogleMapsFacade';
export { default as GoogleAnalyticsFacade } from './GoogleAnalyticsFacade';

// Usage examples:
// - YouTubeFacade: Lazy loads YouTube embeds with thumbnail preview
// - GoogleMapsFacade: Lazy loads Google Maps with interactive placeholder
// - GoogleAnalyticsFacade: Defers Google Analytics loading until user interaction