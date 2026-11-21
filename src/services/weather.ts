// Interface untuk data dari API
export interface WeatherApiResponse {
  current: {
    temperature_2m: number;
    wind_speed_10m: number;
  };
}

//Interface untuk object cuaca
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
        // untuk memproses respons setelah fetch() selesai:
        if (!response.ok) {
          reject(new Error("Gagal mengambil data cuaca."));
          return null;
        }
        //respon di ubah menjadi json
        return response.json() as Promise<WeatherApiResponse>;
      })
      .then((data) => {
        if (!data) return;
        // Object-nya dibuat
        const weather: MalangWeather = {
          city: "Malang",
          temperature: data.current.temperature_2m,
          windSpeed: data.current.wind_speed_10m,
        };

        resolve(weather); // untuk mengirim object cuaca jika proses berhasil
      })
      .catch((error: unknown) => reject(error)); // meneruskan error ke reject()
  });
}
