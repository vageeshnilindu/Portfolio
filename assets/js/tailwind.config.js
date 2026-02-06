tailwind.config = {
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                "primary": "#1fd7ef",
                "primary-glow": "rgba(31, 215, 239, 0.5)",
                "background-dark": "#0B1120",
                "surface-dark": "#151e32",
                // Extra colors from about/projects/contact pages to ensure global compatibility
                "background-light": "#f6f8f8",
                "surface-darker": "#111718",
                "surface-dark-hover": "#1d363a",
                "border-dark": "#283739",
                "card-border": "#283739",
            },
            fontFamily: {
                "display": ["Inter", "sans-serif"],
                "mono": ["JetBrains Mono", "monospace"],
                "body": ["Inter", "sans-serif"]
            },
            animation: {
                marquee: 'marquee 25s linear infinite',
            },
            keyframes: {
                marquee: {
                    '0%': { transform: 'translateX(0)' },
                    '100%': { transform: 'translateX(-50%)' },
                }
            },
            backgroundImage: {
                'space-gradient': 'radial-gradient(circle at top right, #1fd7ef0f, transparent 40%), radial-gradient(circle at bottom left, #1fd7ef08, transparent 40%)',
            },
            boxShadow: {
                'glow': '0 0 15px -3px rgba(31, 215, 239, 0.3)',
                'glow-lg': '0 0 25px -5px rgba(31, 215, 239, 0.4)',
                'cyan-glow': '0 0 20px -5px rgba(31, 215, 239, 0.3)',
            }
        },
    },
}
