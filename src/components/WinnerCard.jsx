'use client';

export default function WinnerCard({ winner }) {
  return (
    <div className="past-winner-card">
      <div className="past-winner-card__icon">{winner.icon}</div>
      <div className="past-winner-card__badge" style={{ background: winner.isWinner ? 'var(--grad-gold)' : 'var(--grad-teal)', color: winner.isWinner ? '#000' : '#fff' }}>
        {winner.rankText}
      </div>
      <h4>{winner.title}</h4>
      <p className="past-winner-card__college">{winner.college}</p>
      <p className="past-winner-card__summary">{winner.summary}</p>
      <span className="tag" style={{ marginTop: 'auto' }}>Edition {winner.edition}.0 — {winner.year}</span>
    </div>
  );
}
