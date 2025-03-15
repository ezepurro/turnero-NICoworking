import '../../styles/components/mainTitle.css'


const MainTitle = () => {
  return (
    <div className="title">
      <div className="image-content">
        <img src="/images/hero.jpeg" />
        <div className="title-overlay">
        <div className="titulo">
            <h1>Beauty Bloom</h1>
            <p className="subtitle">Viví la Suavidad de tu Piel</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MainTitle;