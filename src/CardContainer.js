import { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment/moment';
import 'moment/min/locales'
// Translations//
import { useTranslation } from 'react-i18next';
// Material UI Components //
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import WbCloudyIcon from '@mui/icons-material/WbCloudy';

import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
// === Material UI Components === //

export default function CardContainer({ langDir }) {
    // Use Stat //
    const [Data, setData] = useState({

        CityName: '',
        Tempreature: null,
        maxTemp: null,
        minTemp: null,
        description: '',
        icon: '',

    });
    const [choose, setChoose] = useState('')
    const [time, setTime] = useState('')
    const [lang, setLang] = useState('ar')
    // === Use Stat ===  //
    // Use Translation//
    const { t, i18n } = useTranslation();
    // === Use Translation ===  //
    const City = [
        {
            value: 'Cairo',
            label: t("مدينة القاهرة"),
            apiKey: 'https://api.openweathermap.org/data/2.5/weather?lat=30.03&lon=31.23&appid=1e8cbad728738fb95fb1f4103ab4ed78',
        },
        {
            value: 'Riyadh',
            label: t("مدينة الرياض"),
        },
        {
            value: 'Newyork',
            label: t("مدينة نيويورك"),
        },
        {
            value: 'Alexandria',
            label: t("مدينة الاسكندرية"),
        },
    ];

    // Handler //
    let handleLanguage = () => {
        if (lang === 'ar') {
            setLang('en');
            i18n.changeLanguage('en');
            moment.locale('en');
            setTime(moment().format('LLL'));
        } else {
            setLang('ar');
            i18n.changeLanguage('ar');
            moment.locale('ar');
            setTime(moment().format('LLL'));
        }
    }
    const handelChoose = (e) => {

        setChoose(e.target.value)
    }
    // ===  Handler ===  //

    // Use Effect //
    useEffect(() => {
        i18n.changeLanguage(lang)
    }, [lang])


    useEffect(() => {
        moment.locale('ar');
        setTime(moment().format('LLL'))
    }, [])

    useEffect(() => {

        const controller = new AbortController()

        let url;

        switch (choose) {
            case 'Cairo':
                url = 'https://api.openweathermap.org/data/2.5/weather?lat=30.0626&lon=31.2497&appid=1e8cbad728738fb95fb1f4103ab4ed78';
                break;
            case 'Riyadh':
                url = 'https://api.openweathermap.org/data/2.5/weather?lat=24.6877&lon=46.7219&appid=1e8cbad728738fb95fb1f4103ab4ed78';
                break;
            case 'Alexandria':
                url = 'https://api.openweathermap.org/data/2.5/weather?lat=31.2156&lon=29.9553&appid=1e8cbad728738fb95fb1f4103ab4ed78'
                break;
            case 'Newyork':
                url = 'https://api.openweathermap.org/data/2.5/weather?lat=40.7143&lon=-74.006&appid=1e8cbad728738fb95fb1f4103ab4ed78'
                break;
            default:
                url = 'https://api.openweathermap.org/data/2.5/weather?lat=30.0626&lon=31.2497&appid=1e8cbad728738fb95fb1f4103ab4ed78'
        }

        axios.get(url, { signal: controller.signal })
            .then(function (response) {
                // handle success
                const CityName = response.data.name;
                const Tempreature = Math.round(response.data.main.temp - 273.15);
                const maxTemp = Math.round(response.data.main.temp_max - 273.15);
                const minTemp = Math.round(response.data.main.temp_min - 273.15);
                const Description = response.data.weather[0].description;
                const icon = response.data.weather[0].icon;

                setData({
                    CityName: CityName,
                    Tempreature: Tempreature,
                    maxTemp: maxTemp,
                    minTemp: minTemp,
                    description: Description,
                    icon: icon,


                })

                console.log(Tempreature)




            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })

        return () => {
            console.log('Canceling')
            controller.abort()
        }

    }, [choose])
    // ===  Use Effect ===  //

    const IconUrl = `https://openweathermap.org/img/wn/${Data.icon}@2x.png`

    return (
        < div dir={lang === 'ar' ? 'rtl' : 'ltr'} style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', }}>


            {/* Card */}
            < div style={{
                backgroundColor: 'rgb(27 21 112 / 42%)',
                color: 'white',
                padding: '15px',
                borderRadius: '10px',
                boxShadow: '0px 11px 1px rgba(0, 0, 0, 0.05)',
                width: '100%'

            }} >

                {/* City & Date */}
                < div style={{ display: 'flex', justifyContent: 'start', alignItems: 'end' }
                }>

                    <Typography sx={{ marginRight: 2, fontWeight: '500' }} variant="h2">
                        {t(Data.CityName)}
                    </Typography>

                    <Typography sx={{ marginRight: 2, fontWeight: '400' }} variant="h6">
                        {time}
                    </Typography>


                </div >
                {/* ==  City & Date ==  */}

                < hr />


                {/* Degree & Info */}
                < div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} >

                    {/* Tempreature Div */}
                    <div>
                        <Typography sx={{ textAlign: 'right', fontWeight: '500' }} variant="h1">
                            {Data.Tempreature}°

                            <img src={IconUrl} alt='weather icon' />

                        </Typography>
                        <Typography sx={{ textAlign: lang === 'ar' ? 'right' : 'left' }} variant="h6">
                            {t(Data.description)}
                        </Typography>

                        {/* Min & Max Temp */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <h5 style={{ fontWeight: '400' }}> {t("الصغرى")}:  °{Data.minTemp}</h5>

                            <h5 style={{ margin: '0 8px' }}>| </h5>
                            <h5 style={{ fontWeight: '400' }}> {t("الكبرى")}: °{Data.maxTemp}</h5>

                        </div>

                        {/* Min & Max Temp */}

                    </div>
                    {/* == Tempreature Div == */}

                    {/* Left Div */}
                    <div>
                        <WbCloudyIcon sx={{ fontSize: 140 }} />
                    </div>
                    {/* ==  Left Div == */}

                </div >
                {/* == Degree & Info == */}

            </div >
            {/* == Card  == */}

            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginTop: '50px' }}>
                <Button onClick={handleLanguage} variant="text">{t("اختار اللغة")}</Button>

                <TextField
                    onChange={handelChoose}
                    sx={{
                        direction: 'rtl',
                        backgroundColor: 'rgb(27 21 112 / 42%)',
                        width: '30%', '& .MuiSelect-select': { color: 'white', },
                        '& .MuiSvgIcon-root': {
                            color: 'white',
                        },
                    }}

                    value={choose}
                    id="filled-select-currency"
                    select
                    label={t("اختار المدينة")}
                    defaultValue="Cairo"
                    InputLabelProps={{
                        style: {
                            color: 'white'
                        }
                    }}

                >
                    {City.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>

            </div>

        </div >
    )
}