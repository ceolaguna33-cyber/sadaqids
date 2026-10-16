import React from 'react';
import { RotateCcw, Compass, AlertCircle } from 'lucide-react';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('SADAQIDS Game caught an error:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
    try {
      const raw = window.localStorage.getItem('jejak_baik_progress_v2');
      if (raw) {
        const parsed = JSON.parse(raw);
        if (!Array.isArray(parsed?.completedLevels)) {
          parsed.completedLevels = [];
          window.localStorage.setItem('jejak_baik_progress_v2', JSON.stringify(parsed));
        }
      }
    } catch (e) {
      // ignore
    }
    if (this.props.onReset) {
      this.props.onReset();
    }
    if (typeof window !== 'undefined') {
      window.location.reload();
    }
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-6 text-center select-none">
          <div className="w-full max-w-md bg-stone-900 border-4 border-amber-400 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
            <div className="w-16 h-16 rounded-full bg-amber-400/20 border-2 border-amber-400 flex items-center justify-center mx-auto mb-4 text-3xl">
              🌳
            </div>
            <h2 className="font-display font-black text-2xl text-amber-300 mb-2">
              Pohon Kebaikan Beristirahat
            </h2>
            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed mb-4 font-medium">
              Terjadi sedikit kendala saat memuat adegan petualangan. Jangan khawatir, progres kebaikanmu tetap tersimpan aman!
            </p>
            {this.state.error && (
              <div className="p-3 mb-4 rounded-xl bg-red-950/80 border border-red-500/60 text-red-200 text-xs font-mono text-left overflow-auto max-h-32">
                <strong>Detail:</strong> {this.state.error.message || String(this.state.error)}
              </div>
            )}
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <button
                onClick={this.handleReset}
                className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-display font-black text-sm flex items-center justify-center gap-2 shadow-lg transition-transform active:scale-95 cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Muat Ulang Petualangan</span>
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
