import React from "react";

const useDebounce = (callback, delay) => {    
    const timeout = React.useRef(null);

    const trigger = (...args) => {
        if (timeout.current) clearTimeout(timeout.current);
        timeout.current = setTimeout(() => callback(...args), delay * 1000);
    };

    return trigger;
};

export default useDebounce;
