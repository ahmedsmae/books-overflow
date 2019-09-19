import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { updateNotificationStart } from '../../redux/current-user/current-user.actions';

import './notification-card.styles.scss';

const NotificationCard = ({
  notification: {
    notificationid,
    note: { title, jsx },
    seen
  },
  updateNotificationStart
}) => {
  const [view, setView] = useState({ seen, showMore: false });

  const getJsx = () => (
    <div className='card-body' dangerouslySetInnerHTML={{ __html: jsx }} />
  );

  return (
    <div className='card my-2'>
      <div className='card-header'>
        <div className='row'>
          <h3 className={`col ${!view.seen && 'text-danger'}`}>{title}</h3>

          <Link
            className='col-1.5 nav-link text-center mr-2'
            onClick={() => {
              setView({ showMore: !view.showMore, seen: true });
              updateNotificationStart(notificationid);
            }}
          >
            {view.showMore ? 'Show Less...' : 'Show More...'}
          </Link>
        </div>
      </div>
      {view.showMore && <>{getJsx()}</>}
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  updateNotificationStart: notificationId =>
    dispatch(updateNotificationStart(notificationId))
});

export default connect(
  null,
  mapDispatchToProps
)(NotificationCard);
