// PAS 5 · La graella amb totes les targetes

// FORAT 5.1 · imports de MUI
import { Alert, Grid } from '@mui/material'
import type { Curs } from '../dades/cursos';
import { TargetaCurs } from './TargetaCurs';

type Props = {
  cursos: Curs[];
  preferits?: Set<number>; // els id dels cursos preferits (pas 8)
  onPreferit?: (id: number) => void; // (pas 8)
  onDetall?: (curs: Curs) => void; // (pas 10)
};

export function LlistaCursos({
  cursos,
  preferits = new Set(),
  onPreferit,
  onDetall,
}: Props) {
  if (cursos.length === 0) {
    return (
      <Alert severity="info">
        Cap curs coincideix amb la cerca. Prova amb una altra paraula.
      </Alert>
    );
  }
  return (
    <Grid container spacing={3}>
      {cursos.map((curs) => (
        <Grid key={curs.id} size={{ xs: 12, sm: 6, md: 4 }}>
          <TargetaCurs
            curs={curs}
            preferit={preferits.has(curs.id)}
            onPreferit={onPreferit}
            onDetall={onDetall}
          />
        </Grid>
      ))}
    </Grid>
  );
  // FORAT 5.2 · provisional: només la primera targeta, per provar-la al pas 4
  return <div style={{ maxWidth: 360 }}><TargetaCurs curs={cursos[0]} /></div>;
}
