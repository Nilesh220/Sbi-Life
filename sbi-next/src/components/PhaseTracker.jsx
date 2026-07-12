'use client';

import { IdeationXData } from '@/lib/data';

export default function PhaseTracker() {
  const { phases, currentPhase } = IdeationXData.config;

  return (
    <>
      {phases.map(phase => {
        let cls = 'phase-step-item--upcoming';
        if (phase.locked) cls = 'phase-step-item--locked';
        else if (phase.id < currentPhase) cls = 'phase-step-item--done';
        else if (phase.id === currentPhase) cls = 'phase-step-item--active';

        const dotContent = phase.id < currentPhase ? '✓' : phase.locked ? '🔒' : phase.id;

        return (
          <div key={phase.id} className={`phase-step-item ${cls}`}>
            <div className="phase-dot-circle">{dotContent}</div>
            <div className="phase-dot-label">{phase.name}</div>
            <div className="phase-dot-date">{phase.date}</div>
          </div>
        );
      })}
    </>
  );
}
