import {Pipe, PipeTransform} from '@angular/core';
import {socialMediaList} from "@shared/models/social_media.model";

@Pipe({
  name: 'socialMediaName',
  standalone: true
})
export class SocialMediaNamePipe implements PipeTransform {

  transform(value: unknown): unknown {
    return socialMediaList.find(a => a.id === value)!.name;
  }

}
