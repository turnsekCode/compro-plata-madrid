import React from "react";
//import Image from "next/image";
import styles from "./section_uno.module.css";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import { Link } from "react-scroll";
import useScreenSize from "@/utilities/useScreenSize";

const Section_uno = () => {
  const { width } = useScreenSize();
  return (
    <section className={styles.contenedorSectionUno}>
      <div className={styles.bloqueIzq}>
        <h1>
          Compro Plata <span className={styles.linea}>Madrid</span>
        </h1>
        <p>
          Vender plata en Madrid nunca había sido tan fácil. En Quickgold te
          garantizamos el mejor servicio de toda la ciudad, con una tasación
          detallada, a la vista y a un precio justo. Consulta el precio de la
          plata en Madrid.
        </p>
        <div className={styles.botones}>
          <Link
            to="contenedorMapa"
            smooth={true}
            offset={-110}
            spy={true}
            duration={500}
            title="texto"
            passive="true"
          >
            <LocationOnOutlinedIcon />
            encuentra tu tienda
          </Link>
          <a href="tel:900 373 629" title="Teléfono">
            llama gratis al 900 373 629
          </a>
        </div>
      </div>
      <div className={styles.bloqueDer}>
        {width <= 610 ? (
          <img
            src="/plata-mobil.webp"
            alt="Compro plata madrid"
            className={styles.madridMobil}
            width={290}
            height={220}
          />
        ) : (
          <img
            src="/plata.webp"
            alt="Compro plata madrid"
            className={styles.vector}
            width={480}
            height={364}
          />
        )}
      </div>
    </section>
  );
};

export default Section_uno;
