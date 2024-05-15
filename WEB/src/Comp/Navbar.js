import { Link, NavLink } from "react-router-dom"

export const Navbar = () => {
    const Linkcomp = (props) => {

        return (
            <>
                <NavLink className="btn rounded-0 btn-lg p-4" to={props.path}>
                    {props.name}
                </NavLink>
            </>
        )
    }
    return (
        <>
        <div>
            <div style={{ position: 'fixed', width: '100%' }} className="p-4 mynav d-flex justify-content-center">
                <div className="d-flex" style={{gap:'30px'}}>
                    <Linkcomp name="Home" path="/"/>
                    <Linkcomp name="Map" path="/Map"/>
                    <Linkcomp name="Reports" path="/Reports"/>
                </div>
            </div>
        </div>
        </>
    )
}