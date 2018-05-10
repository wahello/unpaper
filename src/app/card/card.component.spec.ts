// import { ComponentFixture, TestBed } from '@angular/core/testing';

// import { CardComponent } from './card.component';
// import { MaterialModule } from '../shared/modules/material.module';

// const mockPhoto = {
//   urls: {
//     regular: '',
//   },
//   likes: 100,
//   user: {
//     name: '',
//     location: '',
//     profile_image: {
//       medium: '',
//     },
//   },
// };

// describe('CardComponent', () => {
//   let component: CardComponent;
//   let fixture: ComponentFixture<CardComponent>;

//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       declarations: [CardComponent],
//       imports: [MaterialModule],
//     });

//     fixture = TestBed.createComponent(CardComponent);
//     component = fixture.componentInstance;
//     component.photo = mockPhoto;

//     fixture.autoDetectChanges();
//   });

//   describe('#setImageHandler', () => {
//     it('should emit event on image set', done => {
//       component.setImage.subscribe(photo => {
//         expect(component.photo).toBe(photo);
//         done();
//       });

//       component.setImageHandler();
//     });
//   });
// });
