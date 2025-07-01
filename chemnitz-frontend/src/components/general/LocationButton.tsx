import PinDropIcon from '@mui/icons-material/PinDrop';

export default function LocationButton({ handleButtonClick }: { handleButtonClick: () => void }) {
  return (
     <button
          onClick={handleButtonClick}
          style={{
            backgroundColor: '#1c191b',
            color: 'white',
            borderRadius: '50px',
            width: '50%',
            height: '40px',
            fontSize: '1rem',
            cursor: 'pointer',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            transition: 'all 0.3s ease',
            border: '1px solid #1c191b',
            marginBottom: '10px',
            minWidth: "9rem",
            whiteSpace: 'nowrap'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'white';
            e.currentTarget.style.color = '#1c191b';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#1c191b';
            e.currentTarget.style.color = 'white';
          }}
          className="text-white focus:outline-none font-medium rounded-full border-1 border-[1c191b] text-sm text-center transition duration-200 flex justify-center items-center gap-2"
        >
          <PinDropIcon fontSize="small" />
          See Location
        </button>
  )
}
