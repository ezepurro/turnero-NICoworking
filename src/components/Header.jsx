import '../styles/components/header.css';


const Header = ({ txt, br }) => {
  return (
    <>
        <h1 className="header-title text-center">
            <a href="/">
                <b>NUEVA IDENTIDAD COWORKING</b>
            </a>
            {(br === true)
                ? <br />
                : null
            }{txt}
        </h1>
    </>
  )
}

export default Header
