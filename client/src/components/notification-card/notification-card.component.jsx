import React, { useState } from 'react';
import { connect } from 'react-redux';

import { updateNotificationStart } from '../../redux/current-user/current-user.actions';

import CustomButton from '../custom-button/custom-button.component';

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
    <div className='card m-2'>
      <div className='card-header'>
        <div className='row'>
          <h3 className={`col-md-9 ${!view.seen && 'text-danger'}`}>{title}</h3>
          <div className='col-md-3'>
            <CustomButton
              small
              outline
              primary
              onClick={() => {
                setView({ showMore: !view.showMore, seen: true });
                updateNotificationStart(notificationid);
              }}
            >
              {view.showMore ? 'Show Less...' : 'Show More...'}
            </CustomButton>
          </div>
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
