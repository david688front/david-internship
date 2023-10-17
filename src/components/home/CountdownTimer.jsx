import React, { useState, useEffect } from 'react';
import moment from 'moment';

function CountdownTimer({ initialCountdown }) {
  initialCountdown = initialCountdown - Date.now()
  const [countdown, setCountdown] = useState(initialCountdown);

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1000);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  if (countdown > 0) {

    const duration = moment.duration(countdown);
    const hours = duration.hours();
    const minutes = duration.minutes();
    const seconds = duration.seconds();

    return (
      <div className="de_countdown">
        {hours}h {minutes}m {seconds}s
      </div>
    );
  } else {
    return "";
  }
}


export default CountdownTimer;
