import { useState } from 'react';
import { Container, Typography } from '@mui/material';
// FORAT 11.1 · importa Alert i Snackbar de MUI
import { Alert, Snackbar } from '@mui/material';

import { Capcalera } from './components/Capcalera';
import { Presentacio } from './components/Presentacio';
import { Cercador } from './components/Cercador';
import { LlistaCursos } from './components/LlistaCursos';
import { MenuLateral } from './components/MenuLateral';
import { DetallCurs } from './components/DetallCurs';
import { PeuDePagina } from './components/PeuDePagina';
import { cursos, type Curs, type Familia } from './dades/cursos';

export default function App() {
  // --- Estat de la pàgina (viu a App perquè el comparteixen diversos fills) ---
  // FORAT 6.3 · estat del text del cercador
  const [text, setText] = useState('');

  // FORAT 7.3 · estat de la família
  const [familia, setFamilia] = useState<Familia | 'Totes'>('Totes');
  // FORAT 8.1 · estat dels preferits
  const [preferits, setPreferits] = useState<Set<number>>(new Set());

  // FORAT 9.4 · estat del menú lateral
  const [menuObert, setMenuObert] = useState(false);
  // FORAT 10.3 · estat del curs obert
  const [cursObert, setCursObert] = useState<Curs | null>(null);

  // FORAT 11.2 · estat del missatge
  const [missatge, setMissatge] = useState<string | null>(null);


  // --- Dades derivades ---
  const cursosFiltrats = cursos.filter(
    (c) =>
      c.nom.toLowerCase().includes(text.toLowerCase()) &&
      (familia === 'Totes' || c.familia === familia),
  );
  // FORAT 6.4 · el filtre

  // --- Accions ---
  // FORAT 8.2 · canviaPreferit
  const canviaPreferit = (id: number) => {
    setPreferits((anteriors) => {
      // còpia: l'estat no es modifica mai directament
      const nous = new Set(anteriors);
      if (nous.has(id)) nous.delete(id);
      else nous.add(id);
      return nous;
    });
  };
  // FORAT 10.4 · inscriu
  const inscriu = (curs: Curs) => {
    setCursObert(null);
    setMissatge(`T’has inscrit a «${curs.nom}». Rebràs un correu amb els detalls.`);
    // provisional: el pas 11 ho canvia
  };

  return (
    <>
      <Capcalera
        // FORAT 8.3 · prop preferits
        preferits={preferits.size}

        // FORAT 9.5 · prop onObrirMenu
        onObrirMenu={() => setMenuObert(true)}

      />
      <MenuLateral
        obert={menuObert}
        onTancar={() => setMenuObert(false)}
        familia={familia}
        onFamilia={setFamilia}
      />

      <Presentacio />

      <Container maxWidth="lg" id="cursos" sx={{ py: 5 }}>
        <Typography variant="h4" component="h2" gutterBottom>
          Catàleg de cursos
        </Typography>
        {<Cercador
          text={text}
          onText={setText}
          // FORAT 7.5 · props familia i onFamilia
          familia={familia}
          onFamilia={setFamilia}
        />/* FORAT 6.5 · el cercador */}
        <LlistaCursos
          cursos={cursosFiltrats}
          // FORAT 8.4 · props preferits i onPreferit
          preferits={preferits}
          onPreferit={canviaPreferit}

          // FORAT 10.5 · prop onDetall
          onDetall={setCursObert}

        />
      </Container>

      <PeuDePagina />

      {/* FORAT 10.6 · el diàleg amb la fitxa del curs */}
      <DetallCurs
        curs={cursObert}
        onTancar={() => setCursObert(null)}
        onInscriure={inscriu}
      />
      <Snackbar
        open={missatge !== null}
        autoHideDuration={4000}
        onClose={() => setMissatge(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity="success" variant="filled" onClose={() => setMissatge(null)}>
          {missatge}
        </Alert>
      </Snackbar>

    </>
  );
}
