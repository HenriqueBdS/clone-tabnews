function CapsLock(propriedades) {
  const textoEmCaixaAlta = propriedades.texto.toUpperCase();
  console.log(textoEmCaixaAlta);

  return  textoEmCaixaAlta ;
}

export default function StatusPage() {
  return (
    <>
      <h1>Status</h1>
      <CapsLock texto="teste de texto" />
    </>
  );
}
