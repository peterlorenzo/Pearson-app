import React from 'react'
import { Link } from 'react-router-dom'

return (
    <nav>
        <section>
            <h1>The Correlation Machine</h1>

            <div className="navContent">
                <div className="navLinks">
                    <Link to="/">Upload</Link>
                    <Link to="/sets">Users</Link>
                    <Link to="/notifications">
                    </Link>
                </div>
            </div>
        </section>
    </nav>
)
