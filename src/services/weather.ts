export interface WeatherApiResponse {
  current: {
    temperature_2m: number;
    wind_speed_10m: number;
  };
}

export interface MalangWeather {
  city: string;
  temperature: number;
  windSpeed: number;
}

// Fungsi custom async yang mengambil cuaca Malang dari Open-Meteo.
export async function getMalangWeather(): Promise<MalangWeather> {
  return new Promise<MalangWeather>((resolve, reject) => {
    fetch(
      "https://api.open-meteo.com/v1/forecast?latitude=-7.9666&longitude=112.6326&current=temperature_2m,wind_speed_10m&timezone=Asia%2FJakarta",
    )
      .then((response) => {
        if (!response.ok) {
          reject(new Error("Gagal mengambil data cuaca."));
          return null;
        }

        return response.json() as Promise<WeatherApiResponse>;
      })
      .then((data) => {
        if (!data) return;

        const weather: MalangWeather = {
          city: "Malang",
          temperature: data.current.temperature_2m,
          windSpeed: data.current.wind_speed_10m,
        };

        resolve(weather);
      })
      .catch((error: unknown) => reject(error));
  });
}
