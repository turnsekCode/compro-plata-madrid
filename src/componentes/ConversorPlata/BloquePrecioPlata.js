import { useState, useEffect } from "react";
import styles from "./conversor.module.css";

const CalculadoraOro = ({ ciudad }) => {
  const nombreCiudad = ciudad?.acf?.ciudad_oro;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(null);
  useEffect(() => {
    fetch(`https://quickgold.es/archivos-cache/Fixing${nombreCiudad}.txt`, {
      cache: "no-cache",
    })
      .then((response) => response.json())
      .then((response) => {
        setData(response);
        setLoading(true);
      });
  }, []);
  const [valorInput, setValorInput] = useState("0.00");
  const [valorSelect, setValorSelect] = useState("0.00");
  const [masDe, setMasDe] = useState(true);
  const precio999 =
    (data?.result?.Tarifas?.Plata[3].Productos[0].Precio).toFixed(2);
  const precio925 =
    (data?.result?.Tarifas?.Plata[2].Productos[0].Precio).toFixed(2);
  const precio800 =
    (data?.result?.Tarifas?.Plata[0].Productos[0].Precio).toFixed(2);
  const masDePlata = ciudad?.acf?.para_mas_de_plata;
  const PrecioMasPlata = ciudad?.acf?.precio_mas_de_plata;
  const precio999Suma = (
    parseFloat(precio999) + parseFloat(PrecioMasPlata)
  ).toFixed(2);
  const precio925Suma = (
    parseFloat(precio925) + parseFloat(PrecioMasPlata)
  ).toFixed(2);
  const precio800Suma = (
    parseFloat(precio800) + parseFloat(PrecioMasPlata)
  ).toFixed(2);
  const valorSelectSuma = (
    parseFloat(valorSelect) + parseFloat(PrecioMasPlata)
  ).toFixed(2);
  const valorSelectNormal = parseFloat(valorSelect).toFixed(2);
  return (
    <div className={styles.contenedorAmbosBloquesOro}>
      <div className={styles.contenedorBloqueSuperior}>
        <div className={styles.botones}>
          <button
            onClick={() => {
              setMasDe(true);
            }}
            className={
              masDe
                ? `${styles.button} ${styles.botonActivo}`
                : `${styles.button} `
            }
          >
            Más de {masDePlata}kg
          </button>
          <button
            onClick={() => {
              setMasDe(false);
            }}
            className={
              masDe
                ? `${styles.button} `
                : `${styles.button} ${styles.botonActivo}`
            }
          >
            Menos de {masDePlata}kg
          </button>
        </div>
        {masDe ? (
          <div className={styles.contenedorPrecios}>
            <div className={styles.contenedorprecioDestacado}>
              <div className={styles.precioDestacado}>
                <p className={styles.masde}>Más de {masDePlata}kg</p>
                {!loading ? (
                  <p className={styles.precio18k}>Cargando</p>
                ) : (
                  <p className={styles.precio18k}>
                    {precio999Suma}
                    <span>€/kg</span>
                  </p>
                )}
                <p className={styles.kilates}>999</p>
              </div>
            </div>
            <div className={styles.contenedorOtrosPrecios}>
              <div className={styles.OtrosPrecios}>
                {!loading ? (
                  <p className={styles.precio}>Cargando</p>
                ) : (
                  <p className={styles.precio}>
                    {precio925Suma} <span>€/kg</span>
                  </p>
                )}
                <p className={styles.preciok}>925</p>
              </div>
              <div className={styles.OtrosPrecios}>
                {!loading ? (
                  <p className={styles.precio}>Cargando</p>
                ) : (
                  <p className={styles.precio}>
                    {precio800Suma} <span>€/kg</span>
                  </p>
                )}
                <p className={styles.preciok}>800</p>
              </div>
            </div>
          </div>
        ) : (
          <div className={styles.contenedorPrecios}>
            <div className={styles.contenedorprecioDestacado}>
              <div className={styles.precioDestacado}>
                <p className={styles.masde}>Menos de {masDePlata}kg</p>
                <p className={styles.precio18k}>
                  {precio999}
                  <span>€/kg</span>
                </p>
                <p className={styles.kilates}>999</p>
              </div>
            </div>
            <div className={styles.contenedorOtrosPrecios}>
              <div className={styles.OtrosPrecios}>
                <p className={styles.precio}>
                  {precio925} <span>€/kg</span>
                </p>
                <p className={styles.preciok}>925</p>
              </div>
              <div className={styles.OtrosPrecios}>
                <p className={styles.precio}>
                  {precio800} <span>€/kg</span>
                </p>
                <p className={styles.preciok}>800</p>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className={styles.contenedorCalculadora}>
        <h2>
          ¿Cuánto <span>te vamos a dar</span> por tus joyas?
        </h2>
        <div className={styles.contenedorSelect}>
          <div className={styles.Select}>
            <p>Selecciona pureza</p>
            <select
              onChange={(e) => {
                setValorSelect(e.target.value);
              }}
            >
              <option value={0}>---</option>
              <option value={precio999}>999</option>
              <option value={precio925}>925</option>
              <option value={precio800}>800</option>
            </select>
          </div>
          <div className={styles.input}>
            <p>Introduce gramos</p>
            <input
              placeholder="Cantidad"
              pattern="[0-9]*"
              inputMode="numeric"
              onChange={(event) => setValorInput(event.target.value)}
            />
            <span>g</span>
          </div>
        </div>
        <p className={styles.tituloInferior}>TE DAMOS POR TU PLATA</p>
        <p className={styles.precioFinal}>
          {valorInput >= parseFloat(masDePlata * 1000)
            ? ((valorInput / 1000) * valorSelectSuma).toLocaleString("es", {
                style: "currency",
                currency: "EUR",
              })
            : ((valorInput / 1000) * valorSelectNormal).toLocaleString("es", {
                style: "currency",
                currency: "EUR",
              })}
          <span></span>
        </p>
        <p className={styles.promocion}>
          <span className={styles.linea}>Promoción Online</span>
        </p>
      </div>
      <a
        className={styles.botonLlamarTienda}
        href={`tel:${ciudad?.acf?.telefono}`}
      >
        LLAMA GRATIS AL {ciudad?.acf?.telefono}
      </a>
    </div>
  );
};

export default CalculadoraOro;
