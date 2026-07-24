import * as React from "react";
import { SunIcon, SnowflakeIcon, CloudIcon, DropletIcon } from "../../site/icons";

interface WeatherWidgetProps {
  city: string;
  // In production, this would fetch from OpenWeatherMap API (free tier: 1000 calls/day)
  // or WeatherAPI.com (free tier: 1 million calls/month)
  // For the demo, we show a static mock with the real API explanation
  temp?: number;
  condition?: "sunny" | "cloudy" | "snow" | "rain";
  context: "hvac" | "landscaping";
}

const WeatherWidget: React.FC<WeatherWidgetProps> = ({
  city,
  temp = 28,
  condition = "snow",
  context,
}) => {
  const conditionIcon = {
    sunny: <SunIcon size={32} />,
    cloudy: <CloudIcon size={32} />,
    snow: <SnowflakeIcon size={32} />,
    rain: <DropletIcon size={32} />,
  };

  const contextMessage =
    context === "hvac"
      ? "When temps drop below 32°F, furnace repair calls spike 400%. Is your heating system ready?"
      : "Snow in the forecast? Book snow removal service before the storm hits.";

  return (
    <div className="demo-weather">
      <div className="demo-weather__header">
        <span className="demo-weather__label">Current Weather</span>
        <span className="demo-weather__city">{city}, IL</span>
      </div>
      <div className="demo-weather__body">
        <div className="demo-weather__icon">{conditionIcon[condition]}</div>
        <div className="demo-weather__temp">{temp}°F</div>
        <div className="demo-weather__condition">
          {condition === "snow" && "Light Snow"}
          {condition === "sunny" && "Clear"}
          {condition === "cloudy" && "Overcast"}
          {condition === "rain" && "Light Rain"}
        </div>
      </div>
      <div className="demo-weather__alert">
        {contextMessage}
      </div>
      <div className="demo-weather__api-note">
        <strong>Powered by OpenWeatherMap API</strong> (free tier: 1,000 calls/day). Production
        sites auto-fetch live conditions and display weather-based service recommendations.
      </div>
    </div>
  );
};

export default WeatherWidget;
