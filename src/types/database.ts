import { Sequelize } from 'sequelize';

import { Concept } from '../../models/Concepts';
import { Character } from '../../models/Characters';
import { Comic } from '../../models/Comics';
import { FavoriteList } from '../../models/FavoriteList';
import { Issue } from '../../models/Issues';
import { Publisher } from '../../models/Publishers';
import { PurchaseComic } from '../../models/PurchaseComic';
import { Purchase } from '../../models/Purchases';
import { Rating } from '../../models/Ratings';
import { Role } from '../../models/Roles';
import { User } from '../../models/Users';

export interface DatabaseType {
  sequelize: Sequelize;
  Sequelize: typeof Sequelize;
  Character: typeof Character;
  Comic: typeof Comic;
  Concept: typeof Concept;
  FavoriteList: typeof FavoriteList;
  Issue: typeof Issue;
  Publisher: typeof Publisher;
  PurchaseComic: typeof PurchaseComic;
  Purchase: typeof Purchase;
  Rating: typeof Rating;
  Role: typeof Role;
  User: typeof User;
};

export type IssueType = typeof Issue;