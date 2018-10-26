import { Pipe, PipeTransform } from '@angular/core';
import { URL_SERVICES } from '../config/config';

@Pipe({
  name: 'image'
})
export class ImagePipe implements PipeTransform {

  transform(img: string, type: string = 'user'): any {

    let url = URL_SERVICES + '/img';

    if(!img){
      return `${url}/users/default`;
    }

    if(img.indexOf('https') >= 0){
      // google image
      return img;
    }

    if(type == 'user' || type == 'users'){
      return `${url}/users/${img}`;
    } else if (type == 'hospital' || type == 'hospitals'){
      return `${url}/hospitals/${img}`;
    } else if (type == 'doctor' || type == 'doctors'){
      return `${url}/doctors/${img}`;
    } else {
      return `${url}/users/default`;
    }

  }

}
