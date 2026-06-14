import React, { useContext } from 'react';
import { useVerbiage } from '../../hooks/useVerbiage';
import { Button } from '../Common/Button';
import { useDiscountForm } from '../../hooks/useDiscountForm';
import { TargetToggle } from '../TargetToggle';
import { DiscountValueInput } from '../DiscountValueInput';
import { CartContext } from '../../context/CartContext';

export const DiscountModal: React.FC = () => {
  const text = useVerbiage();
  const form = useDiscountForm();
  const context = useContext(CartContext);
  const locale = context?.locale || 'en';

  if (!form.isOpen) return null;

  const showDuration = form.target === 'MONTHLY';
  const showDescription = form.target === 'MONTHLY';

  const modalTitle = form.isEditMode
    ? (form.discountName || text.modal.editTitle)
    : text.modal.addTitle;

  return (
    <div className="modal d-block" tabIndex={-1} style={{ backgroundColor: 'rgba(0,0,0,0.45)' }}>
      <div className="modal-dialog modal-dialog-centered" style={{ maxWidth: '650px' }}>
        <div className="modal-content rounded-3 border-0 shadow p-3">
          
          <div className="modal-header border-0 px-4 pt-4 pb-0 align-items-center">
            <h5 className="modal-title fs-5 fw-normal text-dark">
              {modalTitle}
            </h5>
          </div>

          <div className="modal-body px-4 py-3 d-flex flex-column gap-3">
            
            {/* Price Target Toggle */}
            <div className="form-group d-flex flex-column gap-2">
              <label className="small text-muted fw-normal">
                {text.modal.targetQuestion}
              </label>
              <div>
                <TargetToggle
                  label="Target"
                  oneTimeLabel={text.modal.oneTimePrice}
                  monthlyLabel={text.modal.monthlyPrice}
                  value={form.target}
                  onChange={form.setTarget}
                />
              </div>
            </div>

            {/* Discount Input */}
            <div className="form-group">
              <DiscountValueInput
                label={text.modal.discountLabel}
                value={form.discountValue}
                type={form.discountType}
                onValueChange={form.setDiscountValue}
                onTypeChange={form.setDiscountType}
              />
              {/* Optional Preset Limit Warning */}
              {form.maxLimit !== null && (
                <div 
                  className={`small mt-1 fst-italic ${form.isOverLimit ? 'text-danger fw-semibold' : 'text-muted'}`}
                  style={{ fontSize: '0.85rem' }}
                >
                  {locale === 'nl'
                    ? `De korting mag niet hoger zijn dan ${form.maxLimit}${form.discountType === 'PERCENTAGE' ? '%' : ''}`
                    : `The discount cannot exceed ${form.maxLimit}${form.discountType === 'PERCENTAGE' ? '%' : ''}`
                  }
                </div>
              )}
            </div>

            {/* Duration Input (conditional) */}
            {showDuration && (
              <div className="form-group d-flex flex-column gap-1">
                <label className="small text-muted fw-normal">{text.modal.durationLabel}</label>
                <div className="input-group">
                  <input
                    type="number"
                    className="form-control"
                    value={form.durationMonths === 'none' ? '' : form.durationMonths}
                    onChange={(e) => form.setDurationMonths(e.target.value === '' ? 'none' : Number(e.target.value))}
                  />
                  <span className="input-group-text bg-white text-muted">
                    {text.modal.monthsSuffix}
                  </span>
                </div>
              </div>
            )}

            {/* New Price display (read-only) */}
            <div className="form-group d-flex flex-column gap-1">
              <label className="small text-muted fw-normal">{text.modal.newPriceLabel}</label>
              <input
                type="text"
                className="form-control bg-light text-dark fw-semibold"
                readOnly
                value={form.formattedNewPrice}
                style={{ cursor: 'not-allowed' }}
              />
            </div>

            {/* Description Input (conditional) */}
            {showDescription && (
              <div className="form-group d-flex flex-column gap-1">
                <label className="small text-muted fw-normal">{text.modal.descriptionLabel}</label>
                <input
                  type="text"
                  className="form-control"
                  value={form.discountName}
                  onChange={(e) => form.setDiscountName(e.target.value)}
                />
              </div>
            )}

          </div>

          <div className="modal-footer border-0 bg-transparent px-4 pb-4 pt-2 d-flex align-items-center">
            {form.isEditMode ? (
              /* Edit Mode: Cancel and Save on the right side next to each other */
              <div className="d-flex align-items-center justify-content-end gap-3 ms-auto w-100">
                <Button 
                  type="button" 
                  variant="secondary" 
                  onClick={form.closeModal}
                  style={{ minWidth: 'auto', padding: '0 8px' }}
                >
                  {text.modal.cancel}
                </Button>
                <Button 
                  type="button" 
                  variant="primary" 
                  style={{ 
                    backgroundColor: '#26b7c9', 
                    borderColor: '#26b7c9',
                    borderRadius: '4px',
                    opacity: form.isOverLimit ? 0.65 : 1,
                    cursor: form.isOverLimit ? 'not-allowed' : 'pointer'
                  }}
                  onClick={form.handleSave}
                  disabled={form.isOverLimit}
                >
                  {text.modal.save}
                </Button>
              </div>
            ) : (
              /* Add Mode: Cancel on the left, Add on the right */
              <div className="w-100 d-flex align-items-center justify-content-between">
                <Button 
                  type="button" 
                  variant="secondary" 
                  onClick={form.closeModal}
                  style={{ minWidth: 'auto', padding: '0' }}
                >
                  {text.modal.cancel}
                </Button>
                <Button 
                  type="button" 
                  variant="primary" 
                  style={{ 
                    backgroundColor: '#26b7c9', 
                    borderColor: '#26b7c9',
                    borderRadius: '4px',
                    opacity: form.isOverLimit ? 0.65 : 1,
                    cursor: form.isOverLimit ? 'not-allowed' : 'pointer'
                  }}
                  onClick={form.handleSave}
                  disabled={form.isOverLimit}
                >
                  {text.modal.add}
                </Button>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};