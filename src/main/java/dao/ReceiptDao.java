package dao;

import api.ReceiptResponse;

import generated.tables.records.ReceiptRecord;
import generated.tables.records.*;

import org.jooq.Configuration;
import org.jooq.DSLContext;
import org.jooq.impl.DSL;
import org.jooq.Record;

import java.math.BigDecimal;
import java.util.List;

import static com.google.common.base.Preconditions.checkState;
import static generated.Tables.*;

public class ReceiptDao {
	DSLContext dsl;

	public ReceiptDao(Configuration jooqConfig) {
		this.dsl = DSL.using(jooqConfig);
	}

	public int insert(String merchantName, BigDecimal amount) {
		ReceiptRecord receiptRecord = dsl.insertInto(RECEIPT, RECEIPT.MERCHANT, RECEIPT.AMOUNT) //receipt is the table
				.values(merchantName, amount).returning(RECEIPT.ID).fetchOne();

		checkState(receiptRecord != null && receiptRecord.getId() != null, "Insert failed");

		return receiptRecord.getId();
	}

	public List<ReceiptRecord> getAllReceipts() {
		return dsl.selectFrom(RECEIPT).fetch();
	}

	public List<ReceiptTagRecord> getReceiptTags(String tagName, Integer receiptId) {
		return dsl.select()
				.from(RECEIPT_TAG
					.join(TAG).on(TAG.ID.eq(RECEIPT_TAG.TAGID))
					.join(RECEIPT).on(RECEIPT.ID.eq(RECEIPT_TAG.RECEIPTID)))
				.where(TAG.TAGNAME.eq(tagName))
				.and(RECEIPT.ID.eq(receiptId))
				.fetch().into(RECEIPT_TAG);
	}

	public void addTagToReceipt(String tagName, Integer receiptId) {
		boolean tagExists = dsl.fetchExists(dsl.selectFrom(TAG).where(TAG.TAGNAME.eq(tagName)));
		if (!tagExists) {
			dsl.insertInto(TAG, TAG.TAGNAME).values(tagName).execute();
		}
		Integer tagId = dsl.selectFrom(TAG).where(TAG.TAGNAME.eq(tagName)).fetchOne().getValue(TAG.ID);
		dsl.insertInto(RECEIPT_TAG, RECEIPT_TAG.TAGID, RECEIPT_TAG.RECEIPTID).values(tagId, receiptId).execute();
	}

	public void removeTagFromReceipt(String tagName, Integer receiptId) {
		Integer tagId = dsl.select().from(TAG).where(TAG.TAGNAME.eq(tagName)).fetchOne().getValue(TAG.ID);
		dsl.delete(RECEIPT_TAG)
			.where(RECEIPT_TAG.TAGID.eq(tagId))
			.and(RECEIPT_TAG.RECEIPTID.eq(receiptId))
			.execute();
	}

	public List<ReceiptRecord> getTaggedReceipts(String tagQuery) {
		return dsl.select()
				.from(
						RECEIPT.join(RECEIPT_TAG.join(TAG).on(RECEIPT_TAG.TAGID.eq(TAG.ID))).on(RECEIPT.ID.eq(RECEIPT_TAG.RECEIPTID)))
				.where(TAG.TAGNAME.eq(tagQuery)).fetch().into(RECEIPT);
	}

}
