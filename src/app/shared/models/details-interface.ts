import {PhotoInterface} from "./photo-interface";

export interface DetailsInterface {
  photo: {
    id: string;
    secret: string;
    server: string;
    dateuploaded: string;
    owner: {
      nsid: string;
      username: string;
      realname: string;
      location: string;
    }
    title: {
      _content: string;
    }
    description: {
      _content: string;
    }
    dates: {
      posted: string;
      taken: string;
      lastupdate: string;
    }
    views: string;
    comments: {
      _content: string;
    }
    notes: {
      note: string[];
    }
    people: {
      haspeople: number;
    }
    location: {
      latitude: string;
      longitude: string;
      locality: {
        _content: string;
      }
      county: {
        _content: string;
      }
      region: {
        _content: string;
      }
      country: {
        _content: string;
      }
      neighbourhood: {
        _content: string;
      }
    }
  }
}