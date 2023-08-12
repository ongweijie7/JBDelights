import DisplayPost from "../components/DisplayPost";

const Favourites = () => {
    return (
        <section className="view-submissions-container">
            <DisplayPost className="view-submissions"  
            routeUrl="/food/" apiUrl="http://localhost:3000/login/favourites"
            isFavourites={true}/>
        </section>
    )
}

export default Favourites;