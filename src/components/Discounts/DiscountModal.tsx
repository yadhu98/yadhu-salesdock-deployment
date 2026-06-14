import React from 'react';
import { useVerbiage } from '../../hooks/useVerbiage';
import { Button } from '../Common/Button';
import { useDiscountForm } from '../../hooks/useDiscountForm';
import { TargetToggle } from '../TargetToggle'
import { DiscountValueInput } from '../DiscountValueInput';

export const DiscountModal: React.FC = () => {
  const text = useVerbiage();
  const form = useDiscountForm();

  if (!form.isOpen) return null;

  return (
    <div className="modal d-block" tabIndex={-1} style={{ backgroundColor: 'rgba(0,0,0,0.45)' }}>
      <div className="modal-dialog modal-dialog-centered" style={{ maxWidth: '520px' }}>
        <div className="modal-content rounded-0 border-0 shadow">
          <div className="modal-header border-bottom px-4 py-3 align-items-center">
            <h5 className="modal-title fs-5 fw-normal text-dark">
              {form.isEditMode ? text.modal.editTitle : text.modal.addTitle}
            </h5>
            <button type="button" className="btn-close shadow-none" onClick={form.closeModal} />
          </div>

          <div className="modal-body px-4 py-4 d-flex flex-column gap-4">

            <TargetToggle
              label="Target"
              oneTimeLabel={text.modal.oneTimePrice}
              monthlyLabel={text.modal.monthlyPrice}
              value={form.target}
              onChange={form.setTarget}
            />

            <div className="form-group d-flex flex-column gap-1">
              <label className="small text-muted fw-bold">{text.modal.descriptionLabel || 'Omschrijving'}</label>
              <input
                type="text"
                className="form-control rounded-0"
                value={form.discountName}
                onChange={(e) => form.setDiscountName(e.target.value)}
                placeholder={form.isEditMode ? text.modal.editTitle : text.modal.addTitle}
              />
            </div>

            <div className="row g-3">
              <div className="col-6">
                <DiscountValueInput
                  label={text.modal.discountLabel}
                  value={form.discountValue}
                  type={form.discountType}
                  onValueChange={form.setDiscountValue}
                  onTypeChange={form.setDiscountType}
                />
              </div>

              <div className="col-6 form-group d-flex flex-column gap-1">
                <label className="small text-muted fw-bold">{text.modal.durationLabel}</label>
                <select
                  className="form-select rounded-0"
                  disabled={form.target === 'ONE_TIME'}
                  value={form.durationMonths}
                  onChange={(e) => form.setDurationMonths(e.target.value === 'none' ? 'none' : Number(e.target.value))}
                >
                  <option value="none">{text.discounts.monthlySuffix}</option>
                  {[3, 6, 12, 24].map(m => (
                    <option key={m} value={m}>{m} {text.modal.monthsSuffix}</option>
                  ))}
                </select>
              </div>
            </div>

          </div>
          <div className="modal-footer border-top bg-light p-3 d-flex justify-content-between gap-2">
            <Button type="button" variant="secondary" onClick={form.closeModal}>
              {text.modal.cancel}
            </Button>
            <Button type="button" variant="primary" onClick={form.handleSave}>
              {form.isEditMode ? text.modal.save : (text.modal.add || 'Toevogen')}
            </Button>
          </div>

        </div>
      </div>
    </div>
  );
};