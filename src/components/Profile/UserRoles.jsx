import React from 'react'
import { useAuth0 } from '../../contexts'
import axios from 'axios'
import './UserRoles.scss'
import { settingRole } from '../../hooks/useAuth0'

const UserRoles = () => {
  const { user } = useAuth0()


  function handlePaidUser(e) {
    e.preventDefault()
    const role = 'paidUser'
    if (user.app_metadata === 'paidUser'){
      window.location.assign('/profile')
    } else {
      settingRole(user, role)
    window.location.assign('/profile')
    }
  }

  function handleFreeUser(e) {
    e.preventDefault()
    const role = 'freeUser'
    if (user.app_metadata === 'freeUser'){
      window.location.assign('/profile')
    } else {
      settingRole(user, role)
    window.location.assign('/profile')
    }
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