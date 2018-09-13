import {User, Media} from './index';

module.exports = {
	mediaUser: [{
      model: User,
      as: 'modifiedByUser' 
    },
    {
      model: Media,
      as: 'media',
      include: {
        model: User,
        as: 'user'
      }
    }]
}