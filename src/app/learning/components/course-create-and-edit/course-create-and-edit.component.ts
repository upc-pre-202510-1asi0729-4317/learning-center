import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {Course} from '../../model/course.entity';
import {NgForm} from '@angular/forms';
import {BaseFormComponent} from '../../../shared/component/base-form/base-form.component';

@Component({
  selector: 'app-course-create-and-edit',
  imports: [],
  templateUrl: './course-create-and-edit.component.html',
  styleUrl: './course-create-and-edit.component.css'
})
export class CourseCreateAndEditComponent extends BaseFormComponent {
  @Input() course!: Course;
  @Input() editMode: boolean = false;
  @Output() protected courseAddRequested = new EventEmitter<Course>();
  @Output() protected courseUpdateRequested = new EventEmitter<Course>();
  @Output() protected cancelRequested = new EventEmitter<void>();

  @ViewChild('courseForm', { static: false }) protected courseForm !: NgForm;

  constructor() {
    super();
    this.course = new Course({});
  }

  private resetEditState() {
    this.course = new Course({});
    this.editMode = false;
    this.courseForm.reset();
  }

  private isValid = () => this.courseForm.valid;

  protected isEditMode = (): boolean => this.editMode;

  protected onSubmit() {
    if (this.isValid()) {
      let emitter = this.isEditMode() ? this.courseUpdateRequested : this.courseAddRequested;
      emitter.emit(this.course);
      this.resetEditState();
    } else {
      console.error('Invalid form data');
    }
  }

  protected onCancel() {
    this.cancelRequested.emit();
    this.resetEditState();
  }
}
