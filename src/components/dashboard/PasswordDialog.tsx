import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase, isSupabaseConfigured } from '../../lib/supabaseClient';
import type { Wish } from '../../types/wish';

interface PasswordDialogProps {
  onSuccess: (wishes: Wish[]) => void;
  onCancel: () => void;
}

const WRONG_MESSAGE = "Sorry... You are not Jayapriya. This surprise isn't for you.";

const PasswordDialog: React.FC<PasswordDialogProps> = ({ onSuccess, onCancel }) => {
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showWrong, setShowWrong] = useState(false);
  const [shake, setShake] = useState(false);

  const triggerWrong = () => {
    setShowWrong(true);
    setShake(true);
    window.setTimeout(() => setShake(false), 600);
    window.setTimeout(() => setShowWrong(false), 2000);
  };

  const handleUnlock = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isSupabaseConfigured) {
      triggerWrong();
      return;
    }

    setLoading(true);
    try {
      const { data, error: rpcError } = await supabase.rpc('get_all_wishes', {
        passphrase: password,
      });

      if (rpcError || !data) {
        triggerWrong();
        return;
      }

      onSuccess(data as Wish[]);
    } catch (err) {
      console.error(err);
      triggerWrong();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pw-dialog-backdrop">
      <motion.div
        className={`pw-dialog-card ${shake ? 'pw-dialog-shake' : ''}`}
        initial={{ opacity: 0, y: 24, scale: 0.94 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      >
        <div className="pw-dialog-icon">🔐</div>
        <h2 className="pw-dialog-title">Special Birthday Access</h2>
        <p className="pw-dialog-subtitle">This area is reserved for someone very special.</p>

        <form onSubmit={handleUnlock} className="pw-dialog-form">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            autoFocus
            className={showWrong ? 'pw-dialog-input-error' : ''}
          />

          <AnimatePresence>
            {showWrong && (
              <motion.p
                className="pw-dialog-wrong-message"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                {WRONG_MESSAGE}
              </motion.p>
            )}
          </AnimatePresence>

          <div className="pw-dialog-actions">
            <button type="button" className="pw-dialog-cancel" onClick={onCancel}>
              Cancel
            </button>
            <button type="submit" className="pw-dialog-unlock" disabled={loading}>
              {loading ? 'Unlocking...' : 'Unlock'}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default PasswordDialog;
