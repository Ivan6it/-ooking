import PorkImg from '/images/Pork.png';

type PorkIconProps = {
  active?: boolean;
};

export function PorkIcon({ active = true }: PorkIconProps) {
  return (
    <>
      {active && (
        <div style={{ width: '95px', height: '107px', position: 'relative' }}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="95"
            height="95"
            style={{ position: 'absolute', left: '0', bottom: '0' }}
            fill="none"
            viewBox="0 0 95 95">
            <circle cx="47.5" cy="47.5" r="47.5" fill="#edffe3" />
          </svg>
          <div
            style={{ width: '62px', height: '92px', position: 'absolute', top: '0', left: '16px' }}>
            <img
              loading="lazy"
              src={PorkImg}
              alt="Pork"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                filter: 'drop-shadow(2px 4px 2px rgba(57, 53, 53, 0.5))',
              }}
            />
          </div>
        </div>
      )}
      {!active && (
        <div style={{ width: '95px', height: '107px', position: 'relative' }}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            style={{ position: 'absolute', bottom: '0', left: '0', zIndex: '0' }}
            width="95"
            height="95"
            fill="none"
            viewBox="0 0 95 95">
            <circle cx="47.5" cy="47.5" r="45.5" fill="#edffe3" stroke="#fd3b3b" strokeWidth="4" />
          </svg>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="68"
            height="67"
            style={{ position: 'absolute', bottom: '13px', left: '13px', zIndex: '2' }}
            fill="none"
            viewBox="0 0 68 67">
            <path stroke="#fd3b3b" strokeWidth="4" d="m1.403 65.425 65-64" />
          </svg>
          <div
            style={{ width: '62px', height: '92px', position: 'absolute', top: '0', left: '16px' }}>
            <img
              loading="lazy"
              src={PorkImg}
              alt="Pork"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                filter: 'drop-shadow(2px 4px 2px rgba(57, 53, 53, 0.5))',
              }}
            />
          </div>
        </div>
      )}
    </>
  );
}
