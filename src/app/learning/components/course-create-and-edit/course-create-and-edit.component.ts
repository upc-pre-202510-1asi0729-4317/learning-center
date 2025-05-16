import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {Course} from "../../model/course.entity";
import {FormsModule, NgForm} from "@angular/forms";
import {MatFormField} from "@angular/material/form-field";
import {MatButton} from "@angular/material/button";
import {MatInput} from "@angular/material/input";
import {BaseFormComponent} from '../../../shared/components/base-form/base-form.component';

/**
 * Component for creating and editing course information.
 * Provides a form interface for adding new courses or modifying existing ones.
 */
@Component({
  selector: 'app-course-create-and-edit',
  imports: [
    MatFormField,
    FormsModule,
    MatButton,
    MatInput
  ],
  templateUrl: './course-create-and-edit.component.html',
  styleUrl: './course-create-and-edit.component.css'
})
export class CourseCreateAndEditComponent extends BaseFormComponent {
  //#region Attributes
  /** The course being created or edited */
  @Input() course!: Course;

  /** Flag indicating whether the component is in edit mode */
  @Input() editMode: boolean = false;

  /** Event emitter for when a new course should be added */
  @Output() protected courseAddRequested = new EventEmitter<Course>();

  /** Event emitter for when an existing course should be updated */
  @Output() protected courseUpdateRequested = new EventEmitter<Course>();

  /** Event emitter for when the operation is canceled */
  @Output() protected cancelRequested = new EventEmitter<void>();

  /** Reference to the course form */
  @ViewChild('courseForm', {static: false}) protected courseForm!: NgForm;
  //#endregion Attributes

  //#region Methods

  /**
   * Initializes the component with a new empty Course instance
   */
  constructor() {
    super();
    this.course = new Course({});
  }

  /**
   * Resets the component state to its initial values
   * Clears the form, creates a new empty course, and exits edit mode
   */
  private resetEditState() {
    this.course = new Course({});
    this.editMode = false;
    this.courseForm.reset();
  }

  /**
   * Checks if the form data is valid
   * @returns True if the form is valid, false otherwise
   */
  private isValid = () => this.courseForm.valid;

  /**
   * Checks if the component is in edit mode
   * @returns True if in edit mode, false otherwise
   */
  protected isEditMode = (): boolean => this.editMode;

  /**
   * Handles form submission
   * If the form is valid, emits either a 'create' or 'update' event based on edit mode
   * After successful submission, resets the component state
   */
  protected onSubmit() {
    if (this.isValid()) {
      let emitter = this.isEditMode() ? this.courseUpdateRequested : this.courseAddRequested;
      emitter.emit(this.course);
      this.resetEditState();
    } else {
      console.error('Invalid form data');
    }
  }

  /**
   * Handles cancellation of the create/edit operation
   * Emits a cancel event and resets the component state
   */
  protected onCancel() {
    this.cancelRequested.emit();
    this.resetEditState();
  }

  //#endregion Methods
}
