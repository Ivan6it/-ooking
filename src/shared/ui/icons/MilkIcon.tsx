import milkImage from '/images/Milk.png';

type MilkIconProps = {
  active?: boolean;
};

export function MilkIcon({ active = true }: MilkIconProps) {
  return (
    <>
      {!active && (
        <div style={{ position: 'relative', width: '95px', height: '117px' }}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            style={{ position: 'absolute', bottom: '0', left: '0' }}
            width="95"
            height="95"
            fill="none"
            viewBox="0 0 95 95">
            <circle cx="47.5" cy="47.5" r="45.5" fill="#edffe3" stroke="#fd3b3b" stroke-width="4" />
          </svg>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="68"
            height="67"
            style={{ position: 'absolute', bottom: '13px', left: '13px', zIndex: '1' }}
            fill="none"
            viewBox="0 0 68 67">
            <path stroke="#fd3b3b" stroke-width="4" d="m1.403 65.425 65-64" />
          </svg>
          <div
            style={{
              width: '45px',
              height: '109px',
              position: 'absolute',
              top: '0',
              left: '25px',
            }}>
            <img
              loading="lazy"
              src={milkImage}
              alt="milk"
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
      {active && (
        <div style={{ position: 'relative', width: '95px', height: '117px' }}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="95"
            height="95"
            style={{ position: 'absolute', bottom: '0', left: '0' }}
            fill="none"
            viewBox="0 0 95 95">
            <circle cx="47.5" cy="47.5" r="47.5" fill="#edffe3" />
          </svg>
          <div
            style={{
              width: '45px',
              height: '109px',
              position: 'absolute',
              top: '0',
              left: '25px',
            }}>
            <img
              loading="lazy"
              src={milkImage}
              alt="milk"
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
