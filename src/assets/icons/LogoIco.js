const LogoIco = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="150"
    height="150"
    viewBox="0 0 150 150"
    {...props}
  >
    <defs>
      <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: "white", stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: "white", stopOpacity: 0.7 }} />
      </linearGradient>
    </defs>
    <g transform="translate(10 10)">
      {/* Main CV Shape */}
      <path
        d="M20 0
           C15 0 10 5 10 10
           V120
           C10 125 15 130 20 130
           H110
           C115 130 120 125 120 120
           V10
           C120 5 115 0 110 0
           H20Z"
        fill="transparent"
        stroke="white"
        strokeWidth="2"
      />

      {/* Abstract CV Lines */}
      <g transform="translate(30 30)">
        {/* Header Line */}
        <rect x="0" y="0" width="70" height="2" fill="white" rx="1" />
        {/* Content Lines */}
        <rect x="0" y="15" width="50" height="2" fill="white" rx="1" />
        <rect x="0" y="30" width="60" height="2" fill="white" rx="1" />
      </g>

      {/* Arabic Text Container */}
      <foreignObject x="20" y="65" width="100" height="50">
        <div
          xmlns="http://www.w3.org/1999/xhtml"
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            direction: "rtl",
            fontFamily: "Arial",
            fontSize: "38px",
            fontWeight: "bold",
            color: "white",
          }}
        >
          نبذة
        </div>
      </foreignObject>
    </g>
  </svg>
);

export default LogoIco;
