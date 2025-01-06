import '../styles/components/header.css';


const Header = ({ txt, br }) => {
  return (
    <>
        <h1 className="header-title text-center">
            <a href="/">
                <b>BeautyCenter</b>
            </a>
            {(br)
                ? <br />
                : null
            }{txt}
        </h1>
    </>
  )
}

export default Header
