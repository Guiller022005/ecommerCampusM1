import React, { useState } from 'react';
import { X, Database, Check, Copy, ExternalLink, ShieldCheck } from 'lucide-react';
import { isSupabaseConfigured } from '../lib/supabase';

interface SupabaseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SupabaseModal: React.FC<SupabaseModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const envSnippet = `VITE_SUPABASE_URL=https://your-project-id.supabase.co\nVITE_SUPABASE_ANON_KEY=your-anon-public-key`;

  const copyEnv = () => {
    navigator.clipboard.writeText(envSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-container supabase-guide-modal" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="modal-close-btn" onClick={onClose} aria-label="Close">
          <X size={20} />
        </button>

        <div className="supabase-modal-header">
          <div className="supabase-icon-badge">
            <Database size={28} />
          </div>
          <div>
            <h2>Supabase Integration Guide</h2>
            <p>Connect your PostgreSQL cloud database in 3 minutes</p>
          </div>
        </div>

        {/* Current Status Pill */}
        <div className={`status-banner ${isSupabaseConfigured ? 'banner-connected' : 'banner-local'}`}>
          <div className="status-flex">
            <span className="status-indicator-dot" />
            <strong>Status: {isSupabaseConfigured ? 'Live Supabase Connected' : 'Local Seed Mode Active'}</strong>
          </div>
          <small>
            {isSupabaseConfigured
              ? 'Your React app is actively querying live Supabase tables.'
              : 'The app works 100% offline right now using the built-in local database seed.'}
          </small>
        </div>

        <div className="setup-steps">
          {/* Step 1 */}
          <div className="step-card">
            <span className="step-num">1</span>
            <div className="step-content">
              <h4>Create your Supabase Project</h4>
              <p>Go to Supabase and create a new project with PostgreSQL.</p>
              <a
                href="https://supabase.com/dashboard"
                target="_blank"
                rel="noreferrer"
                className="step-link"
              >
                <span>Open Supabase Dashboard</span>
                <ExternalLink size={14} />
              </a>
            </div>
          </div>

          {/* Step 2 */}
          <div className="step-card">
            <span className="step-num">2</span>
            <div className="step-content">
              <h4>Run Database Migration</h4>
              <p>
                Open the <strong>SQL Editor</strong> in Supabase, paste the contents of{' '}
                <code>database/ecommerce.sql</code> and click <strong>Run</strong>. All tables and seed
                products will be created automatically!
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="step-card">
            <span className="step-num">3</span>
            <div className="step-content">
              <h4>Add Environment Variables</h4>
              <p>
                Create a <code>.env.local</code> file in your project root with your Project URL & Anon
                Key:
              </p>
              <div className="code-box">
                <pre>{envSnippet}</pre>
                <button type="button" className="btn-copy-code" onClick={copyEnv}>
                  {copied ? <Check size={14} /> : <Copy size={14} />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="modal-actions-footer">
          <button type="button" className="btn-modal-dismiss" onClick={onClose}>
            <ShieldCheck size={18} />
            <span>Got it, thanks!</span>
          </button>
        </div>
      </div>
    </div>
  );
};
