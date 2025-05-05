import axios from "axios";

export default function Reduce(currentState, action) {


    switch (action.type) {
        case 'get': {





            const controller = action.payload.controller
            const url = action.payload.url


            axios.get(url, { signal: controller.signal })
                .then(function (response) {
                    // handle success
                    const CityName = response.data.name;
                    const Tempreature = Math.round(response.data.main.temp - 273.15);
                    const maxTemp = Math.round(response.data.main.temp_max - 273.15);
                    const minTemp = Math.round(response.data.main.temp_min - 273.15);
                    const Description = response.data.weather[0].description;
                    const icon = response.data.weather[0].icon;

                    const NewData = {
                        CityName: CityName,
                        Tempreature: Tempreature,
                        maxTemp: maxTemp,
                        minTemp: minTemp,
                        description: Description,
                        icon: icon,

                    }

                    console.log(NewData)

                    return NewData




                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                })

            return () => {
                console.log('Canceling')
                controller.abort()
            }




        }
    }
}
