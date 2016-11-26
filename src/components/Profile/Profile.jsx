import React from 'react'
import { connect } from 'react-redux'
import Satisfy from '../Satisfy/Satisfy'
import Links from '../Links/Links'
import { getProfile as getProfileAction } from '../../actions/profileActions'

const Profile = ({ params: { id }, profiles, getProfile }) => {
  const profile = profiles[id]
  return (
    <div className="Profile">
      <Satisfy condition={ !!profile } action={ getProfile } id={ id } />
      <h2>Profile page</h2>
      { !profile && <div>Profile is loading!</div> }
      { profile && profile.error && <div>Profile failed to load</div> }
      { profile && !profile.error && <div>Profile is loaded: { profile.name }!</div> }
      <br />
      <Links />
    </div>
  )
}

const mapStateToProps = ({ profiles }) => ({ profiles })
export default connect(mapStateToProps, { getProfile: getProfileAction })(Profile)

/*
Maybe...

compose(
  connect(mapStateToProps, { getProfile: getProfileAction }),
  provide({ profile: ({ id, getProfile }) => getProfile(id) })
)(Profile)



*/

/*
  Check out performance of match vs renderToString
 */
