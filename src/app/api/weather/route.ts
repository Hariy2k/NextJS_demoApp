import { NextRequest, NextResponse } from 'next/server';

const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY || '';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const city = searchParams.get('city') || 'London';
    const units = searchParams.get('units') || 'metric';

    const weatherUrl = `${BASE_URL}/weather?q=${city}&appid=${OPENWEATHER_API_KEY}&units=${units}`;
    
    const response = await fetch(weatherUrl);
    
    if (!response.ok) {
      if (response.status === 401) {
        return NextResponse.json(
          { error: 'Invalid API key. Please set OPENWEATHER_API_KEY in your environment variables.' },
          { status: 500 }
        );
      }
      throw new Error(`Weather API responded with status: ${response.status}`);
    }

    const weatherData = await response.json();

    const formattedData = {
      location: {
        name: weatherData.name,
        country: weatherData.sys.country,
        coordinates: {
          lat: weatherData.coord.lat,
          lon: weatherData.coord.lon
        }
      },
      current: {
        temperature: weatherData.main.temp,
        feels_like: weatherData.main.feels_like,
        humidity: weatherData.main.humidity,
        pressure: weatherData.main.pressure,
        description: weatherData.weather[0].description,
        icon: weatherData.weather[0].icon,
        wind_speed: weatherData.wind.speed,
        wind_direction: weatherData.wind.deg,
        visibility: weatherData.visibility / 1000,
        uv_index: weatherData.uvi || 0
      },
      timestamp: new Date().toISOString()
    };

    return NextResponse.json(formattedData);

  } catch (error) {
    console.error('Weather API Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch weather data' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { cities } = body;

    if (!Array.isArray(cities) || cities.length === 0) {
      return NextResponse.json(
        { error: 'Please provide an array of city names' },
        { status: 400 }
      );
    }

    const weatherPromises = cities.map(async (city: string) => {
      const weatherUrl = `${BASE_URL}/weather?q=${city}&appid=${OPENWEATHER_API_KEY}&units=metric`;
      const response = await fetch(weatherUrl);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch weather for ${city}`);
      }

      const data = await response.json();
      return {
        city: data.name,
        country: data.sys.country,
        temperature: data.main.temp,
        description: data.weather[0].description,
        humidity: data.main.humidity,
        wind_speed: data.wind.speed
      };
    });

    const results = await Promise.allSettled(weatherPromises);
    const weatherData = results.map((result, index) => ({
      city: cities[index],
      success: result.status === 'fulfilled',
      data: result.status === 'fulfilled' ? result.value : null,
      error: result.status === 'rejected' ? result.reason.message : null
    }));

    return NextResponse.json({ weatherData });

  } catch (error) {
    console.error('Batch Weather API Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch batch weather data' },
      { status: 500 }
    );
  }
}
