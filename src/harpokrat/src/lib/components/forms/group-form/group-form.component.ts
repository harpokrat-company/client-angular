import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {IGroup, IGroupResource, IOrganizationResource, IPrivateKey} from "@harpokrat/client";
import {AuthService} from "../../../services/auth.service";
import {GroupService} from "../../../services/group.service";
import {combineLatest, Observable} from "rxjs";
import {VaultService} from "../../../services/vault.service";
import {SecretService} from "../../../services/secret.service";
import {ApiService} from "../../../services/api.service";
import {UserSecretService} from "../../../services/user-secret.service";
import {map, switchMap, tap} from "rxjs/operators";

@Component({
  selector: 'hpk-group-form',
  templateUrl: './group-form.component.html',
  styleUrls: ['./group-form.component.css']
})
export class GroupFormComponent implements OnInit {

  error: string;

  groupForm: FormGroup;

  loading: boolean;

  @Input() group: IGroupResource;

  @Input() parent: IGroupResource;

  @Input() organisation: IOrganizationResource;

  @Output() readonly create = new EventEmitter<IGroupResource>();

  @Output() readonly groupChange = this.create;

  constructor(
    private readonly $formBuilder: FormBuilder,
    private readonly $authService: AuthService,
    private readonly $groupService: GroupService,
    private readonly $vaultService: VaultService,
    private readonly $secretService: SecretService,
    private readonly $apiService: ApiService,
    private readonly $userSecretService: UserSecretService,
  ) {
  }

  ngOnInit() {
    const attributes: Partial<IGroup> = this.group && this.group.attributes || {};
    this.groupForm = this.$formBuilder.group({
      name: [attributes.name || '', Validators.required],
    });
  }

  onCreate() {
    this.loading = true;
    const {name} = this.groupForm.controls;
    let obs: Observable<IGroupResource>;
    const attributes: IGroup = {
      name: name.value,
    };
    if (this.group) {
      const copy = {...this.group};
      delete copy.relationships;
      obs = this.$groupService.update(this.group.id, {
        ...copy,
        attributes,
      });
    } else {
      obs = this.$groupService.create(attributes, {
        organization: this.organisation && {data: this.organisation},
        parent: this.parent && {data: this.parent},
        members: {data: [this.$authService.currentUser as any]},
      });
    }
    obs.subscribe(async (resource) => {
      //const hcl = await this.$apiService.hclModulePromise;
      this.loading = false;
      if (this.group == null) {
        /*const key = hcl.GenerateRSAKeyPair(512);
        const other = hcl.GenerateRSAKeyPair(512);
        const groupPublic = key.GetPublic();
        const groupPrivate = key.GetPrivate();
        groupPublic.InitializePlainCipher();
        groupPrivate.InitializeAsymmetricCipher();
        groupPublic.SetOwner(resource.id);
        groupPrivate.SetOwner(resource.id);
        const test = groupPrivate.SerializeAsymmetric(other.GetPublic().ExtractKey());
        console.log('TEST', test);
        console.log('public:', groupPublic.GetSecretTypeName(), 'private:', groupPrivate.GetSecretTypeName())
        combineLatest([
          this.$secretService.create({
            content: groupPublic.Serialize(''),
            private: false,
          }, {
            owner: {data: resource},
          }),
          this.$userSecretService.publicKey.pipe(
            tap((pub) => console.log('PUBLIC KEY =', pub)),
            map((key) => {
              const extracted = key.ExtractKey();
              console.log('EXTRACTED:', extracted, key.CorrectDecryption(), key.GetSecretTypeName());
              console.log('PRIV:', groupPrivate, groupPrivate.CorrectDecryption(), groupPrivate.GetSecretTypeName());
              let ret: any;
              try {
                ret = groupPrivate.SerializeAsymmetric(extracted);
              } catch (e) {
                console.log(e);
                throw e;

              }
              console.log('OK', ret);
              return ret;
            }),
            tap((serialized) => console.log('SERIALIZED=', serialized)),
            switchMap((content) => this.$secretService.create({
              content,
              private: true,
            }, {
              owner: {data: resource},
            }))
          ),
        ]).subscribe();
        if (this.parent) {
          this.$userSecretService.ofType<IPrivateKey>('private-key').pipe(
            map((arr) => arr.find((s) => s.attributes.GetOwner() === this.parent.id)),
            switchMap((key) => this.$secretService.create({
              content: key.attributes.SerializeAsymmetric(groupPublic),
              private: true,
            }, {
              owner: {data: resource},
            }))
          ).subscribe(() => {
          });
        }*/
      }
      this.create.emit(resource);
    }, () => {
      this.error = 'An error occurred';
      this.loading = false;
    });
  }
}
