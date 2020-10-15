import React from 'react'
import { Link } from 'react-router-dom'
import { FiPlus } from 'react-icons/fi'
import { Map, TileLayer } from 'react-leaflet'

import 'leaflet/dist/leaflet.css'
import '../styles/pages/orphanagesMap.css'
import logoImg from '../images/logo.svg'

function OrphanegesMap() {
    return (
        <div id="page-map">
            <aside>
                <header>
                    <img src={logoImg} alt="Logo carinha feliz"/>

                    <h2>Escolha um orfanato no mapa</h2>
                    <p>Muitas crianças estão esperando sua visita :)</p>
                </header>
                <footer>
                    <strong>Mirassol</strong>
                    <span>São Paulo</span>
                </footer>
            </aside>
            <Map

                center={[-20.8168056, -49.5058325]}
                zoom={14}
                style={{
                    width: '100%',
                    height: '100%'
                }}>
                {/* <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"/> */}
                <TileLayer
                 url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
                  />
            </Map>

            <Link to="" className="crete-orphanage">
                <FiPlus size={32} color="#fff" />
            </Link>
        </div>
    );
}

export default OrphanegesMap;