import React from 'react'
import { useAuth0 } from '../../contexts'
import { baseURL } from '../../urls'
import axios from 'axios'
import './UserRoles.scss'

const UserRoles = () => {
  const { user } = useAuth0()

  const updateUserRole = (userId, user) => {
    axios
      .put(`${baseURL}/api/users/${userId}`, user)
      .then(res => {
        console.log(`test`)
        return res
      })
      .catch(err => console.log(err))
  }

  function handlePaidUser(e) {
    e.preventDefault()
    const paidUser = {
      app_metadata: {
        role: 'paidUser'
      }
    }
    updateUserRole(user.sub, paidUser)
  }

  function handleFreeUser(e) {
    e.preventDefault()
    const freeUser = {
      app_metadata: {
        role: 'freeUser'
      }
    }
    updateUserRole(user.sub, freeUser)
  }

  return (
    <div>
      <h3 className="plan">Select Your Plan</h3>
      <div className="wrapper">
        <ul className="cards">
          <li className="cards__item">
            <div className="card">
              <div className="card__content">
                <div className="card__title">Free</div>
                <p className="card__text">
                  Up to 10,000 API calls per month
                </p>
                <p className="card__text">Up to 7 days of market data</p>
                <button className="btn" onClick={handleFreeUser}>
                  Select Plan
                </button>
              </div>
            </div>
          </li>
          <li className="cards__item">
            <div className="card">
              <div className="card__content">
                <div className="card__title">Unlimited</div>
                <p className="card__text">Unlimited API calls per month</p>
                <p className="card__text">
                  Up to 2 years of market data
                </p>
                <button className="btn" onClick={handlePaidUser}>
                  Select Plan
                </button>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default UserRoles